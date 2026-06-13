"use client";

import { useQuery } from "@tanstack/react-query";

import * as adminApi from "@/lib/api/admin";
import { queryKeys } from "@/lib/api/query-keys";
import { fetchBibleVersions, fetchDashboardStats, fetchPlanCategories } from "@/lib/api/public";

export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.dashboard.stats,
    queryFn: fetchDashboardStats,
    staleTime: 60_000,
    retry: 1,
  });
}

export function useDevotionals() {
  return useQuery({
    queryKey: queryKeys.devotionals.all,
    queryFn: adminApi.fetchDevotionals,
  });
}

export function useDevotional(id: string) {
  return useQuery({
    queryKey: queryKeys.devotionals.detail(id),
    queryFn: () => adminApi.fetchDevotional(id),
    enabled: !!id,
  });
}

export function useMeditations() {
  return useQuery({
    queryKey: queryKeys.meditations.all,
    queryFn: adminApi.fetchMeditations,
  });
}

export function useMeditation(id: string) {
  return useQuery({
    queryKey: queryKeys.meditations.detail(id),
    queryFn: () => adminApi.fetchMeditation(id),
    enabled: !!id,
  });
}

export function usePlans() {
  return useQuery({
    queryKey: queryKeys.plans.all,
    queryFn: adminApi.fetchPlans,
  });
}

export function usePlanCategories() {
  return useQuery({
    queryKey: queryKeys.plans.categories,
    queryFn: fetchPlanCategories,
    staleTime: 1000 * 60 * 60,
  });
}

export function usePlan(id: string) {
  return useQuery({
    queryKey: queryKeys.plans.detail(id),
    queryFn: () => adminApi.fetchPlan(id),
    enabled: !!id,
  });
}

export function usePlanDays(planId: string) {
  return useQuery({
    queryKey: queryKeys.plans.days(planId),
    queryFn: () => adminApi.fetchPlanDays(planId),
    enabled: !!planId,
  });
}

export function useBibleVersions() {
  return useQuery({
    queryKey: queryKeys.versions.all,
    queryFn: fetchBibleVersions,
  });
}

export function useSubscriptions(status?: string) {
  return useQuery({
    queryKey: queryKeys.subscriptions.all(status),
    queryFn: () => adminApi.fetchSubscriptions(status),
  });
}

export function useSubscriptionPlans() {
  return useQuery({
    queryKey: queryKeys.subscriptionPlans.all,
    queryFn: adminApi.fetchSubscriptionPlans,
  });
}

export function useAppUsers() {
  return useQuery({
    queryKey: queryKeys.users.all,
    queryFn: adminApi.fetchAppUsers,
  });
}
