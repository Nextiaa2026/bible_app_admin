import { adminApi } from "./client";
import { ApiError } from "./client";
import type {
  AppUser,
  Expectation,
  PlanCategory,
  PlanDay,
  Subscription,
  SubscriptionPlan,
  UploadResult,
} from "./types";

// Devotionals
export async function fetchDevotionals() {
  const { data } = await adminApi.get<unknown[]>("/devotionals");
  return data;
}

export async function fetchDevotional(id: string) {
  const { data } = await adminApi.get<Record<string, unknown>>(`/devotionals/${id}`);
  return data;
}

export async function createDevotional(body: unknown) {
  const { data } = await adminApi.post("/devotionals", body);
  return data;
}

export async function updateDevotional(id: string, body: unknown) {
  const { data } = await adminApi.patch(`/devotionals/${id}`, body);
  return data;
}

export async function deleteDevotional(id: string) {
  await adminApi.delete(`/devotionals/${id}`);
}

// Meditations
export async function fetchMeditations() {
  const { data } = await adminApi.get<unknown[]>("/meditations");
  return data;
}

export async function fetchMeditation(id: string) {
  const { data } = await adminApi.get<Record<string, unknown>>(`/meditations/${id}`);
  return data;
}

export async function createMeditation(body: unknown) {
  const { data } = await adminApi.post("/meditations", body);
  return data;
}

export async function updateMeditation(id: string, body: unknown) {
  const { data } = await adminApi.patch(`/meditations/${id}`, body);
  return data;
}

export async function deleteMeditation(id: string) {
  await adminApi.delete(`/meditations/${id}`);
}

// Expectations (onboarding spiritual goals)
export async function fetchExpectations() {
  const { data } = await adminApi.get<Expectation[]>("/expectations");
  return data;
}

export async function fetchExpectation(id: string) {
  const { data } = await adminApi.get<Expectation>(`/expectations/${id}`);
  return data;
}

export async function createExpectation(body: unknown) {
  const { data } = await adminApi.post<Expectation>("/expectations", body);
  return data;
}

export async function updateExpectation(id: string, body: unknown) {
  const { data } = await adminApi.patch<Expectation>(`/expectations/${id}`, body);
  return data;
}

export async function deleteExpectation(id: string) {
  await adminApi.delete(`/expectations/${id}`);
}

// Plans
export async function fetchPlans() {
  const { data } = await adminApi.get<unknown[]>("/plans");
  return data;
}

export async function fetchPlan(id: string) {
  const { data } = await adminApi.get<Record<string, unknown>>(`/plans/${id}`);
  return data;
}

export async function createPlan(body: unknown) {
  const { data } = await adminApi.post<{ id: string }>("/plans", body);
  return data;
}

export async function updatePlan(id: string, body: unknown) {
  const { data } = await adminApi.patch(`/plans/${id}`, body);
  return data;
}

export async function deletePlan(id: string) {
  await adminApi.delete(`/plans/${id}`);
}

export async function fetchPlanCategoriesAdmin() {
  const { data } = await adminApi.get<PlanCategory[]>("/plan-categories");
  return data;
}

export async function createPlanCategory(body: unknown) {
  const { data } = await adminApi.post<PlanCategory>("/plan-categories", body);
  return data;
}

export async function deletePlanCategory(id: string) {
  await adminApi.delete(`/plan-categories/${id}`);
}

export async function fetchPlanDays(planId: string) {
  const { data } = await adminApi.get<PlanDay[]>(`/plans/${planId}/days`);
  return data;
}

export async function createPlanDay(planId: string, body: unknown) {
  const { data } = await adminApi.post(`/plans/${planId}/days`, body);
  return data;
}

export async function deletePlanDay(planId: string, dayId: string) {
  await adminApi.delete(`/plans/${planId}/days/${dayId}`);
}

// Subscriptions
export async function fetchSubscriptions(status?: string) {
  const q = status ? `?status=${status}` : "";
  const { data } = await adminApi.get<Subscription[]>(`/subscriptions${q}`);
  return data;
}

export async function activateSubscription(id: string) {
  const { data } = await adminApi.patch(`/subscriptions/${id}/activate`, {});
  return data;
}

export async function rejectSubscription(id: string) {
  const { data } = await adminApi.patch(`/subscriptions/${id}/reject`, {});
  return data;
}

export async function fetchSubscriptionPlans() {
  const { data } = await adminApi.get<SubscriptionPlan[]>("/subscription-plans");
  return data;
}

export async function createSubscriptionPlan(body: unknown) {
  const { data } = await adminApi.post("/subscription-plans", body);
  return data;
}

export async function fetchAppUsers() {
  const { data } = await adminApi.get<AppUser[]>("/users");
  return data;
}

// Uploads — proxied through Next.js so auth + multipart work reliably in the browser.
async function uploadViaProxy(path: string, file: File): Promise<UploadResult> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(path, { method: "POST", body: form });
  const data = (await res.json().catch(() => ({}))) as UploadResult & { error?: string };

  if (!res.ok) {
    throw new ApiError(res.status, data.error ?? "Upload failed");
  }

  return data;
}

export async function uploadImage(
  file: File,
  folder: "plans" | "meditations" | "devotionals" | "expectations",
): Promise<UploadResult> {
  return uploadViaProxy(`/api/admin/upload/image?folder=${encodeURIComponent(folder)}`, file);
}

export async function uploadAudio(file: File): Promise<UploadResult> {
  return uploadViaProxy("/api/admin/upload/audio", file);
}
