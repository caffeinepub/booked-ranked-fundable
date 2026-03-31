import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    name: string;
    tenantId: TenantId;
}
export interface AuditScore {
    lastUpdated: Time;
    tenantId: TenantId;
    score: bigint;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Time = bigint;
export interface ReviewRequest {
    id: string;
    customerName: string;
    status: ReviewRequestStatus;
    sentTimestamp: Time;
    platform: string;
    email: string;
    tenantId: TenantId;
    attemptCount: bigint;
    customerFeedback: string;
    serviceCompleted: string;
    phone: string;
    lastFollowUp: Time;
}
export interface SocialPresence {
    linkedin: boolean;
    instagram: boolean;
    facebook: boolean;
    googleMaps: boolean;
}
export interface FreeAuditLead {
    id: string;
    overallScore: bigint;
    websiteUrl: string;
    createdAt: Time;
    businessName: string;
    contactEmail: string;
    phone: string;
    location: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface VoiceAgentConfig {
    callRouting: {
        __kind__: "ai";
        ai: null;
    } | {
        __kind__: "voicemail";
        voicemail: string;
    } | {
        __kind__: "forward";
        forward: string;
    };
    vapiAgentId: string;
    businessHoursText: string;
    tenantId: TenantId;
    configured: boolean;
    greetingScript: string;
    twilioNumber: string;
    services: Array<string>;
}
export interface Lead {
    id: string;
    name: string;
    createdAt: Time;
    email: string;
    tenantId: TenantId;
    phone: string;
}
export interface AgencySettings {
    twilioSid: string;
    twilioAuth: string;
    vapiKey: string;
    twilioNumber: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface ChatWidgetConfig {
    faqItems: Array<string>;
    active: boolean;
    leadCaptureEnabled: boolean;
    greeting: string;
    tenantId: TenantId;
    niche: string;
    embedToken: string;
    bookingEnabled: boolean;
}
export interface FundabilityScore {
    lastUpdated: Time;
    tenantId: TenantId;
    score: bigint;
}
export interface Review {
    id: string;
    createdAt: Time;
    tenantId: TenantId;
    comment: string;
    rating: bigint;
}
export type TenantId = string;
export enum ReviewRequestStatus {
    unhappy = "unhappy",
    happy = "happy",
    sent = "sent",
    awaiting = "awaiting",
    reviewed = "reviewed",
    maxAttempts = "maxAttempts"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    checkSocialPresence(businessName: string): Promise<SocialPresence>;
    checkSocialPresencePublic(businessName: string): Promise<SocialPresence>;
    createLead(lead: Lead): Promise<void>;
    createReview(review: Review): Promise<void>;
    createReviewRequest(request: ReviewRequest): Promise<void>;
    deleteChatWidgetConfig(tenantId: TenantId): Promise<void>;
    deleteLead(tenantId: TenantId, leadId: string): Promise<void>;
    deleteReview(tenantId: TenantId, reviewId: string): Promise<void>;
    deleteReviewRequest(tenantId: TenantId, requestId: string): Promise<void>;
    deleteVoiceAgentConfig(tenantId: TenantId): Promise<void>;
    getActiveChatWidgetConfigs(): Promise<Array<ChatWidgetConfig>>;
    getAgencySettings(): Promise<AgencySettings | null>;
    getAllTenants(): Promise<Array<string>>;
    getAuditScore(tenantId: TenantId): Promise<AuditScore | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getChatWidgetConfig(tenantId: TenantId): Promise<ChatWidgetConfig | null>;
    getConfiguredVoiceAgents(): Promise<Array<VoiceAgentConfig>>;
    getFreeAuditLeads(): Promise<Array<FreeAuditLead>>;
    getFundabilityScore(tenantId: TenantId): Promise<FundabilityScore | null>;
    getLeadById(tenantId: TenantId, leadId: string): Promise<Lead | null>;
    getLeadsByTenantId(tenantId: TenantId): Promise<Array<Lead>>;
    getReviewById(tenantId: TenantId, reviewId: string): Promise<Review | null>;
    getReviewRequest(tenantId: TenantId, requestId: string): Promise<ReviewRequest | null>;
    getReviewRequests(tenantId: TenantId): Promise<Array<ReviewRequest>>;
    getReviewsByTenantId(tenantId: TenantId): Promise<Array<Review>>;
    getTenantName(tenantId: TenantId): Promise<string>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVoiceAgentConfig(tenantId: TenantId): Promise<VoiceAgentConfig | null>;
    isCallerAdmin(): Promise<boolean>;
    runPageSpeedAudit(url: string): Promise<string>;
    runPageSpeedAuditPublic(url: string): Promise<string>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveFreeAuditLead(businessName: string, websiteUrl: string, location: string, contactEmail: string, phone: string, overallScore: bigint): Promise<void>;
    seedDemoData(): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateAgencySettings(settings: AgencySettings): Promise<void>;
    updateAuditScore(tenantId: TenantId, score: bigint): Promise<void>;
    updateFundabilityScore(tenantId: TenantId, score: bigint): Promise<void>;
    updateLead(tenantId: TenantId, leadId: string, lead: Lead): Promise<void>;
    updateReview(tenantId: TenantId, reviewId: string, review: Review): Promise<void>;
    updateReviewRequestStatus(tenantId: TenantId, requestId: string, status: ReviewRequestStatus): Promise<void>;
    upsertChatWidgetConfig(config: ChatWidgetConfig): Promise<void>;
    upsertVoiceAgentConfig(config: VoiceAgentConfig): Promise<void>;
}
