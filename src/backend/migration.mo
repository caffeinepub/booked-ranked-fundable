import Map "mo:core/Map";
import Time "mo:core/Time";

module {
  type TenantId = Text;

  type OldActor = {
    tenants : Map.Map<TenantId, Text>;
    userProfiles : Map.Map<Principal, { name : Text; tenantId : TenantId }>;
    leads : Map.Map<TenantId, Map.Map<Text, { id : Text; tenantId : TenantId; name : Text; email : Text; phone : Text; createdAt : Time.Time }>>;
    reviews : Map.Map<TenantId, Map.Map<Text, { id : Text; tenantId : TenantId; rating : Nat; comment : Text; createdAt : Time.Time }>>;
    auditScores : Map.Map<TenantId, { tenantId : TenantId; score : Nat; lastUpdated : Time.Time }>;
    fundabilityScores : Map.Map<TenantId, { tenantId : TenantId; score : Nat; lastUpdated : Time.Time }>;
    freeAuditLeads : Map.Map<Text, {
      id : Text;
      businessName : Text;
      websiteUrl : Text;
      location : Text;
      contactEmail : Text;
      phone : Text;
      overallScore : Nat;
      createdAt : Time.Time;
    }>;
  };

  type NewActor = {
    tenants : Map.Map<TenantId, Text>;
    userProfiles : Map.Map<Principal, { name : Text; tenantId : TenantId }>;
    leads : Map.Map<TenantId, Map.Map<Text, { id : Text; tenantId : TenantId; name : Text; email : Text; phone : Text; createdAt : Time.Time }>>;
    reviews : Map.Map<TenantId, Map.Map<Text, { id : Text; tenantId : TenantId; rating : Nat; comment : Text; createdAt : Time.Time }>>;
    auditScores : Map.Map<TenantId, { tenantId : TenantId; score : Nat; lastUpdated : Time.Time }>;
    fundabilityScores : Map.Map<TenantId, { tenantId : TenantId; score : Nat; lastUpdated : Time.Time }>;
    freeAuditLeads : Map.Map<Text, {
      id : Text;
      businessName : Text;
      websiteUrl : Text;
      location : Text;
      contactEmail : Text;
      phone : Text;
      overallScore : Nat;
      createdAt : Time.Time;
    }>;
    chatWidgetConfigs : Map.Map<TenantId, {
      tenantId : TenantId;
      niche : Text;
      greeting : Text;
      faqItems : [Text];
      leadCaptureEnabled : Bool;
      bookingEnabled : Bool;
      active : Bool;
      embedToken : Text;
    }>;
    voiceAgentConfigs : Map.Map<TenantId, {
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
    }>;
    reviewRequests : Map.Map<TenantId, Map.Map<Text, {
      id : Text;
      tenantId : TenantId;
      customerName : Text;
      phone : Text;
      email : Text;
      serviceCompleted : Text;
      platform : Text;
      status : {
        #sent;
        #awaiting;
        #happy;
        #unhappy;
        #reviewed;
        #maxAttempts;
      };
      sentTimestamp : Time.Time;
      lastFollowUp : Time.Time;
      attemptCount : Nat;
      customerFeedback : Text;
    }>>;
    agencySettings : ?{
      twilioSid : Text;
      twilioAuth : Text;
      twilioNumber : Text;
      vapiKey : Text;
    };
  };

  public func run(old : OldActor) : NewActor {
    {
      old with
      chatWidgetConfigs = Map.empty();
      voiceAgentConfigs = Map.empty();
      reviewRequests = Map.empty();
      agencySettings = null;
    };
  };
};
