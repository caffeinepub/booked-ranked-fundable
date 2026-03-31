import Map "mo:core/Map";
import Array "mo:core/Array";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Types
  type TenantId = Text;

  type Lead = {
    id : Text;
    tenantId : TenantId;
    name : Text;
    email : Text;
    phone : Text;
    createdAt : Time.Time;
  };

  module Lead {
    public func compare(lead1 : Lead, lead2 : Lead) : Order.Order {
      Text.compare(lead1.id, lead2.id);
    };
  };

  type Review = {
    id : Text;
    tenantId : TenantId;
    rating : Nat;
    comment : Text;
    createdAt : Time.Time;
  };

  module Review {
    public func compare(review1 : Review, review2 : Review) : Order.Order {
      Text.compare(review1.id, review2.id);
    };
  };

  type AuditScore = {
    tenantId : TenantId;
    score : Nat;
    lastUpdated : Time.Time;
  };

  type FundabilityScore = {
    tenantId : TenantId;
    score : Nat;
    lastUpdated : Time.Time;
  };

  public type UserProfile = {
    name : Text;
    tenantId : TenantId;
  };

  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Data storage
  let tenants = Map.empty<TenantId, Text>(); // Tenant name
  let userProfiles = Map.empty<Principal, UserProfile>();

  let leads = Map.empty<TenantId, Map.Map<Text, Lead>>();
  let reviews = Map.empty<TenantId, Map.Map<Text, Review>>();
  let auditScores = Map.empty<TenantId, AuditScore>();
  let fundabilityScores = Map.empty<TenantId, FundabilityScore>();

  // Helper function to check if user has access to tenant
  func hasAccessToTenant(caller : Principal, tenantId : TenantId) : Bool {
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return true;
    };
    
    switch (userProfiles.get(caller)) {
      case (?profile) {
        profile.tenantId == tenantId;
      };
      case (null) { false };
    };
  };

  // User profile operations
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Helper functions for CRUD operations
  func getLeadsByTenantIdInternal(tenantId : TenantId) : List.List<Lead> {
    switch (leads.get(tenantId)) {
      case (?tenantLeads) {
        let leadList = List.empty<Lead>();
        for (lead in tenantLeads.values()) {
          leadList.add(lead);
        };
        leadList;
      };
      case (null) { List.empty<Lead>() };
    };
  };

  func getReviewsByTenantIdInternal(tenantId : TenantId) : List.List<Review> {
    switch (reviews.get(tenantId)) {
      case (?tenantReviews) {
        let reviewList = List.empty<Review>();
        for (review in tenantReviews.values()) {
          reviewList.add(review);
        };
        reviewList;
      };
      case (null) { List.empty<Review>() };
    };
  };

  func createLeadInternal(lead : Lead) : () {
    let tenantLeads = switch (leads.get(lead.tenantId)) {
      case (?existingLeads) { existingLeads };
      case (null) {
        Map.empty<Text, Lead>();
      };
    };
    tenantLeads.add(lead.id, lead);
    leads.add(lead.tenantId, tenantLeads);
  };

  func createReviewInternal(review : Review) : () {
    let tenantReviews = switch (reviews.get(review.tenantId)) {
      case (?existingReviews) { existingReviews };
      case (null) {
        Map.empty<Text, Review>();
      };
    };
    tenantReviews.add(review.id, review);
    reviews.add(review.tenantId, tenantReviews);
  };

  func updateAuditScoreInternal(tenantId : TenantId, score : Nat) : () {
    let newScore : AuditScore = {
      tenantId;
      score;
      lastUpdated = Time.now();
    };
    auditScores.add(tenantId, newScore);
  };

  func updateFundabilityScoreInternal(tenantId : TenantId, score : Nat) : () {
    let newScore : FundabilityScore = {
      tenantId;
      score;
      lastUpdated = Time.now();
    };
    fundabilityScores.add(tenantId, newScore);
  };

  // Tenant operations
  public query ({ caller }) func getTenantName(tenantId : TenantId) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view tenant information");
    };

    if (not hasAccessToTenant(caller, tenantId)) {
      Runtime.trap("Unauthorized: Cannot access this tenant");
    };

    switch (tenants.get(tenantId)) {
      case (?name) { name };
      case (null) { Runtime.trap("Tenant not found") };
    };
  };

  // Lead operations
  public shared ({ caller }) func createLead(lead : Lead) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create leads");
    };

    if (not hasAccessToTenant(caller, lead.tenantId)) {
      Runtime.trap("Unauthorized: Cannot create leads for this tenant");
    };

    createLeadInternal(lead);
  };

  public query ({ caller }) func getLeadsByTenantId(tenantId : TenantId) : async [Lead] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view leads");
    };

    if (not hasAccessToTenant(caller, tenantId)) {
      Runtime.trap("Unauthorized: Cannot view leads for this tenant");
    };

    getLeadsByTenantIdInternal(tenantId).toArray().sort();
  };

  public query ({ caller }) func getLeadById(tenantId : TenantId, leadId : Text) : async ?Lead {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view leads");
    };

    if (not hasAccessToTenant(caller, tenantId)) {
      Runtime.trap("Unauthorized: Cannot view leads for this tenant");
    };

    switch (leads.get(tenantId)) {
      case (?tenantLeads) { tenantLeads.get(leadId) };
      case (null) { null };
    };
  };

  public shared ({ caller }) func deleteLead(tenantId : TenantId, leadId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete leads");
    };

    if (not hasAccessToTenant(caller, tenantId)) {
      Runtime.trap("Unauthorized: Cannot delete leads for this tenant");
    };

    switch (leads.get(tenantId)) {
      case (?tenantLeads) {
        tenantLeads.remove(leadId);
      };
      case (null) { Runtime.trap("Lead not found") };
    };
  };

  // Review operations
  public shared ({ caller }) func createReview(review : Review) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create reviews");
    };

    if (not hasAccessToTenant(caller, review.tenantId)) {
      Runtime.trap("Unauthorized: Cannot create reviews for this tenant");
    };

    createReviewInternal(review);
  };

  public query ({ caller }) func getReviewsByTenantId(tenantId : TenantId) : async [Review] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view reviews");
    };

    if (not hasAccessToTenant(caller, tenantId)) {
      Runtime.trap("Unauthorized: Cannot view reviews for this tenant");
    };

    getReviewsByTenantIdInternal(tenantId).toArray().sort();
  };

  public query ({ caller }) func getReviewById(tenantId : TenantId, reviewId : Text) : async ?Review {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view reviews");
    };

    if (not hasAccessToTenant(caller, tenantId)) {
      Runtime.trap("Unauthorized: Cannot view reviews for this tenant");
    };

    switch (reviews.get(tenantId)) {
      case (?tenantReviews) { tenantReviews.get(reviewId) };
      case (null) { null };
    };
  };

  public shared ({ caller }) func deleteReview(tenantId : TenantId, reviewId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete reviews");
    };

    if (not hasAccessToTenant(caller, tenantId)) {
      Runtime.trap("Unauthorized: Cannot delete reviews for this tenant");
    };

    switch (reviews.get(tenantId)) {
      case (?tenantReviews) {
        tenantReviews.remove(reviewId);
      };
      case (null) { Runtime.trap("Review not found") };
    };
  };

  // Audit score operations
  public shared ({ caller }) func updateAuditScore(tenantId : TenantId, score : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update audit scores");
    };

    updateAuditScoreInternal(tenantId, score);
  };

  public query ({ caller }) func getAuditScore(tenantId : TenantId) : async ?AuditScore {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view audit scores");
    };

    if (not hasAccessToTenant(caller, tenantId)) {
      Runtime.trap("Unauthorized: Cannot view audit scores for this tenant");
    };

    auditScores.get(tenantId);
  };

  // Fundability score operations
  public shared ({ caller }) func updateFundabilityScore(tenantId : TenantId, score : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update fundability scores");
    };

    updateFundabilityScoreInternal(tenantId, score);
  };

  public query ({ caller }) func getFundabilityScore(tenantId : TenantId) : async ?FundabilityScore {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view fundability scores");
    };

    if (not hasAccessToTenant(caller, tenantId)) {
      Runtime.trap("Unauthorized: Cannot view fundability scores for this tenant");
    };

    fundabilityScores.get(tenantId);
  };

  // Seed demo data
  public shared ({ caller }) func seedDemoData() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can seed demo data");
    };

    // Tenants
    tenants.add("tenant1", "Business A");
    tenants.add("tenant2", "Business B");

    // Leads
    let lead1 : Lead = {
      id = "lead1";
      tenantId = "tenant1";
      name = "John Doe";
      email = "john@example.com";
      phone = "123456789";
      createdAt = Time.now();
    };
    let lead2 : Lead = {
      id = "lead2";
      tenantId = "tenant2";
      name = "Jane Smith";
      email = "jane@example.com";
      phone = "987654321";
      createdAt = Time.now();
    };
    createLeadInternal(lead1);
    createLeadInternal(lead2);

    // Reviews
    let review1 : Review = {
      id = "review1";
      tenantId = "tenant1";
      rating = 5;
      comment = "Great service!";
      createdAt = Time.now();
    };
    let review2 : Review = {
      id = "review2";
      tenantId = "tenant2";
      rating = 4;
      comment = "Very satisfied!";
      createdAt = Time.now();
    };
    createReviewInternal(review1);
    createReviewInternal(review2);

    // Audit scores
    updateAuditScoreInternal("tenant1", 85);
    updateAuditScoreInternal("tenant2", 90);

    // Fundability scores
    updateFundabilityScoreInternal("tenant1", 95);
    updateFundabilityScoreInternal("tenant2", 88);
  };
};
