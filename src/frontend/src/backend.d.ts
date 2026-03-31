import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Lead {
    id: string;
    name: string;
    createdAt: Time;
    email: string;
    tenantId: TenantId;
    phone: string;
}
export type TenantId = string;
export interface AuditScore {
    lastUpdated: Time;
    tenantId: TenantId;
    score: bigint;
}
export type Time = bigint;
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
export interface UserProfile {
    name: string;
    tenantId: TenantId;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createLead(lead: Lead): Promise<void>;
    createReview(review: Review): Promise<void>;
    deleteLead(tenantId: TenantId, leadId: string): Promise<void>;
    deleteReview(tenantId: TenantId, reviewId: string): Promise<void>;
    getAuditScore(tenantId: TenantId): Promise<AuditScore | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFundabilityScore(tenantId: TenantId): Promise<FundabilityScore | null>;
    getLeadById(tenantId: TenantId, leadId: string): Promise<Lead | null>;
    getLeadsByTenantId(tenantId: TenantId): Promise<Array<Lead>>;
    getReviewById(tenantId: TenantId, reviewId: string): Promise<Review | null>;
    getReviewsByTenantId(tenantId: TenantId): Promise<Array<Review>>;
    getTenantName(tenantId: TenantId): Promise<string>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedDemoData(): Promise<void>;
    updateAuditScore(tenantId: TenantId, score: bigint): Promise<void>;
    updateFundabilityScore(tenantId: TenantId, score: bigint): Promise<void>;
}
