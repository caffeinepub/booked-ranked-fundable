import Map "mo:core/Map";
import Array "mo:core/Array";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Option "mo:core/Option";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Outcall "http-outcalls/outcall";



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

  public type SocialPresence = {
    facebook : Bool;
    instagram : Bool;
    linkedin : Bool;
    googleMaps : Bool;
  };

  public type FreeAuditLead = {
    id : Text;
    businessName : Text;
    websiteUrl : Text;
    location : Text;
    contactEmail : Text;
    phone : Text;
    overallScore : Nat;
    createdAt : Time.Time;
  };

  public type ChatWidgetConfig = {
    tenantId : TenantId;
    niche : Text;
    greeting : Text;
    faqItems : [Text];
    leadCaptureEnabled : Bool;
    bookingEnabled : Bool;
    active : Bool;
    embedToken : Text;
  };

  public type VoiceAgentConfig = {
    tenantId : TenantId;
    greetingScript : Text;
    businessHoursText : Text;
    services : [Text];
    callRouting : {
      #forward : Text;
      #voicemail : Text;
      #ai;
    };
    twilioNumber : Text;
    vapiAgentId : Text;
    configured : Bool;
  };

  public type ReviewRequestStatus = {
    #sent;
    #awaiting;
    #happy;
    #unhappy;
    #reviewed;
    #maxAttempts;
  };

  public type ReviewRequest = {
    id : Text;
    tenantId : TenantId;
    customerName : Text;
    phone : Text;
    email : Text;
    serviceCompleted : Text;
    platform : Text;
    status : ReviewRequestStatus;
    sentTimestamp : Time.Time;
    lastFollowUp : Time.Time;
    attemptCount : Nat;
    customerFeedback : Text;
  };

  public type AgencySettings = {
    twilioSid : Text;
    twilioAuth : Text;
    twilioNumber : Text;
    vapiKey : Text;
  };

  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Data storage
  let tenants = Map.empty<TenantId, Text>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let leads = Map.empty<TenantId, Map.Map<Text, Lead>>();
  let reviews = Map.empty<TenantId, Map.Map<Text, Review>>();
  let auditScores = Map.empty<TenantId, AuditScore>();
  let fundabilityScores = Map.empty<TenantId, FundabilityScore>();
  let freeAuditLeads = Map.empty<Text, FreeAuditLead>();
  let chatWidgetConfigs = Map.empty<TenantId, ChatWidgetConfig>();
  let voiceAgentConfigs = Map.empty<TenantId, VoiceAgentConfig>();
  let reviewRequests = Map.empty<TenantId, Map.Map<Text, ReviewRequest>>();
  var agencySettings : ?AgencySettings = null;

  // HTTP transform function (required by ICP http outcalls)
  public query func transform(input : Outcall.TransformationInput) : async Outcall.TransformationOutput {
    Outcall.transform(input);
  };

  // Helper: check if URL is accessible
  func checkUrl(url : Text) : async Bool {
    try {
      let response = await Outcall.httpGetRequest(url, [], transform);
      response.size() > 0;
    } catch (_) {
      false;
    };
  };

  // ---- LIVE AUDIT FUNCTIONS ----

  public shared ({ caller }) func runPageSpeedAudit(url : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    let apiUrl = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=" # url # "&strategy=mobile&category=performance&category=seo&category=best-practices";
    await Outcall.httpGetRequest(apiUrl, [], transform);
  };

  public shared ({ caller }) func checkSocialPresence(businessName : Text) : async SocialPresence {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    let slug = businessName.replace(#char ' ', "-");
    let fbOk = await checkUrl("https://www.facebook.com/" # slug);
    let igOk = await checkUrl("https://www.instagram.com/" # slug);
    let liOk = await checkUrl("https://www.linkedin.com/company/" # slug);
    let gmOk = await checkUrl("https://maps.google.com/?q=" # businessName);
    { facebook = fbOk; instagram = igOk; linkedin = liOk; googleMaps = gmOk };
  };

  public func checkSocialPresencePublic(businessName : Text) : async SocialPresence {
    let slug = businessName.replace(#char ' ', "-");
    let fbOk = await checkUrl("https://www.facebook.com/" # slug);
    let igOk = await checkUrl("https://www.instagram.com/" # slug);
    let liOk = await checkUrl("https://www.linkedin.com/company/" # slug);
    let gmOk = await checkUrl("https://maps.google.com/?q=" # businessName);
    { facebook = fbOk; instagram = igOk; linkedin = liOk; googleMaps = gmOk };
  };

  public func runPageSpeedAuditPublic(url : Text) : async Text {
    let apiUrl = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=" # url # "&strategy=mobile&category=performance&category=seo&category=best-practices";
    await Outcall.httpGetRequest(apiUrl, [], transform);
  };

  public func saveFreeAuditLead(
    businessName : Text,
    websiteUrl : Text,
    location : Text,
    contactEmail : Text,
    phone : Text,
    overallScore : Nat
  ) : async () {
    let id = "fal-" # Time.now().toText();
    let lead : FreeAuditLead = {
      id;
      businessName;
      websiteUrl;
      location;
      contactEmail;
      phone;
      overallScore;
      createdAt = Time.now();
    };
    freeAuditLeads.add(id, lead);
  };

  public query ({ caller }) func getFreeAuditLeads() : async [FreeAuditLead] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Admins only");
    };
    let list = List.empty<FreeAuditLead>();
    for (lead in freeAuditLeads.values()) {
      list.add(lead);
    };
    list.toArray();
  };

  // ---- TENANT CHAT WIDGET CONFIG ----

  public shared ({ caller }) func upsertChatWidgetConfig(config : ChatWidgetConfig) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, config.tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    chatWidgetConfigs.add(config.tenantId, config);
  };

  public query ({ caller }) func getChatWidgetConfig(tenantId : TenantId) : async ?ChatWidgetConfig {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    chatWidgetConfigs.get(tenantId);
  };

  public query ({ caller }) func getActiveChatWidgetConfigs() : async [ChatWidgetConfig] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return chatWidgetConfigs.values().toArray().filter(func(c) { c.active });
    };
    // Non-admin users can only see their own tenant's config
    switch (userProfiles.get(caller)) {
      case (?profile) {
        switch (chatWidgetConfigs.get(profile.tenantId)) {
          case (?config) {
            if (config.active) { [config] } else { [] };
          };
          case (null) { [] };
        };
      };
      case (null) { [] };
    };
  };

  public shared ({ caller }) func deleteChatWidgetConfig(tenantId : TenantId) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    chatWidgetConfigs.remove(tenantId);
  };

  // ---- TENANT VOICE AGENT CONFIG ----

  public shared ({ caller }) func upsertVoiceAgentConfig(config : VoiceAgentConfig) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, config.tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    voiceAgentConfigs.add(config.tenantId, config);
  };

  public query ({ caller }) func getVoiceAgentConfig(tenantId : TenantId) : async ?VoiceAgentConfig {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    voiceAgentConfigs.get(tenantId);
  };

  public query ({ caller }) func getConfiguredVoiceAgents() : async [VoiceAgentConfig] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return voiceAgentConfigs.values().toArray().filter(func(v) { v.configured });
    };
    // Non-admin users can only see their own tenant's config
    switch (userProfiles.get(caller)) {
      case (?profile) {
        switch (voiceAgentConfigs.get(profile.tenantId)) {
          case (?config) {
            if (config.configured) { [config] } else { [] };
          };
          case (null) { [] };
        };
      };
      case (null) { [] };
    };
  };

  public shared ({ caller }) func deleteVoiceAgentConfig(tenantId : TenantId) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    voiceAgentConfigs.remove(tenantId);
  };

  // ---- REVIEW REQUEST WORKFLOWS ----

  public shared ({ caller }) func createReviewRequest(request : ReviewRequest) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (not hasAccessToTenant(caller, request.tenantId)) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    let updatedRequest = { request with lastFollowUp = Time.now() : Time.Time };
    let tenantRequests = switch (reviewRequests.get(request.tenantId)) {
      case (?existing) { existing };
      case (null) { Map.empty<Text, ReviewRequest>() };
    };
    tenantRequests.add(request.id, updatedRequest);
    reviewRequests.add(request.tenantId, tenantRequests);
  };

  public shared ({ caller }) func updateReviewRequestStatus(tenantId : TenantId, requestId : Text, status : ReviewRequestStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (not hasAccessToTenant(caller, tenantId)) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    switch (reviewRequests.get(tenantId)) {
      case (?tenantRequests) {
        switch (tenantRequests.get(requestId)) {
          case (?request) {
            let updatedRequest = {
              request with
              status;
              lastFollowUp = Time.now();
            };
            tenantRequests.add(requestId, updatedRequest);
          };
          case (null) { Runtime.trap("Review request not found") };
        };
      };
      case (null) { Runtime.trap("No review requests for tenant") };
    };
  };

  public query ({ caller }) func getReviewRequests(tenantId : TenantId) : async [ReviewRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    switch (reviewRequests.get(tenantId)) {
      case (?tenantRequests) {
        let list = List.empty<ReviewRequest>();
        for (request in tenantRequests.values()) { list.add(request) };
        list.toArray();
      };
      case (null) { [] };
    };
  };

  public query ({ caller }) func getReviewRequest(tenantId : TenantId, requestId : Text) : async ?ReviewRequest {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    switch (reviewRequests.get(tenantId)) {
      case (?tenantRequests) {
        tenantRequests.get(requestId);
      };
      case (null) { null };
    };
  };

  public shared ({ caller }) func deleteReviewRequest(tenantId : TenantId, requestId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    switch (reviewRequests.get(tenantId)) {
      case (?tenantRequests) {
        tenantRequests.remove(requestId);
      };
      case (null) { Runtime.trap("Review request not found") };
    };
  };

  // ---- AGENCY ADMIN SETTINGS ----

  public shared ({ caller }) func updateAgencySettings(settings : AgencySettings) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update agency settings");
    };
    agencySettings := ?settings;
  };

  public query ({ caller }) func getAgencySettings() : async ?AgencySettings {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view agency settings");
    };
    agencySettings;
  };

  // ---- EXISTING FUNCTIONS ----

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

  public query ({ caller }) func getAllTenants() : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    tenants.values().toArray();
  };

  func getLeadsByTenantIdInternal(tenantId : TenantId) : List.List<Lead> {
    switch (leads.get(tenantId)) {
      case (?tenantLeads) {
        let leadList = List.empty<Lead>();
        for (lead in tenantLeads.values()) { leadList.add(lead) };
        leadList;
      };
      case (null) { List.empty<Lead>() };
    };
  };

  func getReviewsByTenantIdInternal(tenantId : TenantId) : List.List<Review> {
    switch (reviews.get(tenantId)) {
      case (?tenantReviews) {
        let reviewList = List.empty<Review>();
        for (review in tenantReviews.values()) { reviewList.add(review) };
        reviewList;
      };
      case (null) { List.empty<Review>() };
    };
  };

  func createLeadInternal(lead : Lead) : () {
    let tenantLeads = switch (leads.get(lead.tenantId)) {
      case (?existing) { existing };
      case (null) { Map.empty<Text, Lead>() };
    };
    tenantLeads.add(lead.id, lead);
    leads.add(lead.tenantId, tenantLeads);
  };

  func createReviewInternal(review : Review) : () {
    let tenantReviews = switch (reviews.get(review.tenantId)) {
      case (?existing) { existing };
      case (null) { Map.empty<Text, Review>() };
    };
    tenantReviews.add(review.id, review);
    reviews.add(review.tenantId, tenantReviews);
  };

  func updateAuditScoreInternal(tenantId : TenantId, score : Nat) : () {
    auditScores.add(tenantId, { tenantId; score; lastUpdated = Time.now() });
  };

  func updateFundabilityScoreInternal(tenantId : TenantId, score : Nat) : () {
    fundabilityScores.add(tenantId, { tenantId; score; lastUpdated = Time.now() });
  };

  public query ({ caller }) func getTenantName(tenantId : TenantId) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    switch (tenants.get(tenantId)) {
      case (?name) { name };
      case (null) { Runtime.trap("Tenant not found") };
    };
  };

  public shared ({ caller }) func createLead(lead : Lead) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, lead.tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    createLeadInternal(lead);
  };

  public query ({ caller }) func getLeadsByTenantId(tenantId : TenantId) : async [Lead] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    getLeadsByTenantIdInternal(tenantId).toArray().sort();
  };

  public shared ({ caller }) func updateLead(tenantId : TenantId, leadId : Text, lead : Lead) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    switch (leads.get(tenantId)) {
      case (?tenantLeads) { tenantLeads.add(leadId, lead) };
      case (null) { Runtime.trap("Lead not found") };
    };
  };

  public query ({ caller }) func getLeadById(tenantId : TenantId, leadId : Text) : async ?Lead {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    switch (leads.get(tenantId)) {
      case (?tenantLeads) { tenantLeads.get(leadId) };
      case (null) { null };
    };
  };

  public shared ({ caller }) func deleteLead(tenantId : TenantId, leadId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    switch (leads.get(tenantId)) {
      case (?tenantLeads) { tenantLeads.remove(leadId) };
      case (null) { Runtime.trap("Lead not found") };
    };
  };

  public shared ({ caller }) func createReview(review : Review) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, review.tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    createReviewInternal(review);
  };

  public query ({ caller }) func getReviewsByTenantId(tenantId : TenantId) : async [Review] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    getReviewsByTenantIdInternal(tenantId).toArray().sort();
  };

  public shared ({ caller }) func updateReview(tenantId : TenantId, reviewId : Text, review : Review) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    switch (reviews.get(tenantId)) {
      case (?tenantReviews) { tenantReviews.add(reviewId, review) };
      case (null) { Runtime.trap("Review not found") };
    };
  };

  public query ({ caller }) func getReviewById(tenantId : TenantId, reviewId : Text) : async ?Review {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    switch (reviews.get(tenantId)) {
      case (?tenantReviews) { tenantReviews.get(reviewId) };
      case (null) { null };
    };
  };

  public shared ({ caller }) func deleteReview(tenantId : TenantId, reviewId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    switch (reviews.get(tenantId)) {
      case (?tenantReviews) { tenantReviews.remove(reviewId) };
      case (null) { Runtime.trap("Review not found") };
    };
  };

  public shared ({ caller }) func updateAuditScore(tenantId : TenantId, score : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update audit scores");
    };
    updateAuditScoreInternal(tenantId, score);
  };

  public query ({ caller }) func getAuditScore(tenantId : TenantId) : async ?AuditScore {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    auditScores.get(tenantId);
  };

  public shared ({ caller }) func updateFundabilityScore(tenantId : TenantId, score : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update fundability scores");
    };
    updateFundabilityScoreInternal(tenantId, score);
  };

  public query ({ caller }) func getFundabilityScore(tenantId : TenantId) : async ?FundabilityScore {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Users only");
    };
    if (not (AccessControl.isAdmin(accessControlState, caller) or hasAccessToTenant(caller, tenantId))) {
      Runtime.trap("Unauthorized: No access to tenant");
    };
    fundabilityScores.get(tenantId);
  };

  public shared ({ caller }) func seedDemoData() : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can seed demo data");
    };
    tenants.add("tenant1", "Business A");
    tenants.add("tenant2", "Business B");
    let lead1 : Lead = { id = "lead1"; tenantId = "tenant1"; name = "John Doe"; email = "john@example.com"; phone = "123456789"; createdAt = Time.now() };
    let lead2 : Lead = { id = "lead2"; tenantId = "tenant2"; name = "Jane Smith"; email = "jane@example.com"; phone = "987654321"; createdAt = Time.now() };
    createLeadInternal(lead1);
    createLeadInternal(lead2);
    let review1 : Review = { id = "review1"; tenantId = "tenant1"; rating = 5; comment = "Great service!"; createdAt = Time.now() };
    let review2 : Review = { id = "review2"; tenantId = "tenant2"; rating = 4; comment = "Very satisfied!"; createdAt = Time.now() };
    createReviewInternal(review1);
    createReviewInternal(review2);
    updateAuditScoreInternal("tenant1", 85);
    updateAuditScoreInternal("tenant2", 90);
    updateFundabilityScoreInternal("tenant1", 95);
    updateFundabilityScoreInternal("tenant2", 88);
  };

  // Helper: check if caller has access to tenant
  func hasAccessToTenant(caller : Principal, tenantId : TenantId) : Bool {
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return true;
    };
    switch (userProfiles.get(caller)) {
      case (?profile) { profile.tenantId == tenantId };
      case (null) { false };
    };
  };
};
