import { publicApi } from "./client";
import type { BibleVersion, DashboardStats } from "./types";

export async function fetchBibleVersions(): Promise<BibleVersion[]> {
  const { data } = await publicApi.get<BibleVersion[]>("/bible-versions");
  return data;
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const today = new Date().toISOString().slice(0, 10);
  const [devotionals, plans, meditations, versions] = await Promise.all([
    publicApi.get<unknown[]>(`/devotionals?date=${today}`).then((r) => r.data).catch(() => []),
    publicApi.get<unknown[]>("/bible-plans").then((r) => r.data).catch(() => []),
    publicApi.get<unknown[]>("/meditations").then((r) => r.data).catch(() => []),
    publicApi.get<unknown[]>("/bible-versions").then((r) => r.data).catch(() => []),
  ]);

  return {
    devotionals: Array.isArray(devotionals) ? devotionals.length : devotionals ? 1 : 0,
    plans: plans.length,
    meditations: meditations.length,
    versions: versions.length,
  };
}
