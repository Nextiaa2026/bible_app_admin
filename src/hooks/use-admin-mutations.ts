"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as adminApi from "@/lib/api/admin";
import { queryKeys } from "@/lib/api/query-keys";
import {
  devotionalFromForm,
  meditationFromForm,
  planDayFromForm,
  planFromForm,
  subscriptionPlanFromForm,
} from "@/lib/form-data";
import { toastError, toastSuccess } from "@/lib/toast";

export function useCreateDevotional() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => adminApi.createDevotional(devotionalFromForm(formData)),
    onSuccess: () => {
      toastSuccess("Dévotion créée");
      void qc.invalidateQueries({ queryKey: queryKeys.devotionals.all });
    },
    onError: (e) => toastError(e, "Impossible de créer la dévotion"),
  });
}

export function useUpdateDevotional(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => adminApi.updateDevotional(id, devotionalFromForm(formData)),
    onSuccess: () => {
      toastSuccess("Dévotion mise à jour");
      void qc.invalidateQueries({ queryKey: queryKeys.devotionals.all });
      void qc.invalidateQueries({ queryKey: queryKeys.devotionals.detail(id) });
    },
    onError: (e) => toastError(e, "Impossible de mettre à jour la dévotion"),
  });
}

export function useDeleteDevotional() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApi.deleteDevotional(id),
    onSuccess: () => {
      toastSuccess("Dévotion supprimée");
      void qc.invalidateQueries({ queryKey: queryKeys.devotionals.all });
    },
    onError: (e) => toastError(e, "Impossible de supprimer la dévotion"),
  });
}

export function useCreateMeditation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => adminApi.createMeditation(meditationFromForm(formData)),
    onSuccess: () => {
      toastSuccess("Méditation créée");
      void qc.invalidateQueries({ queryKey: queryKeys.meditations.all });
    },
    onError: (e) => toastError(e, "Impossible de créer la méditation"),
  });
}

export function useUpdateMeditation(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => adminApi.updateMeditation(id, meditationFromForm(formData)),
    onSuccess: () => {
      toastSuccess("Méditation mise à jour");
      void qc.invalidateQueries({ queryKey: queryKeys.meditations.all });
      void qc.invalidateQueries({ queryKey: queryKeys.meditations.detail(id) });
    },
    onError: (e) => toastError(e, "Impossible de mettre à jour la méditation"),
  });
}

export function useDeleteMeditation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApi.deleteMeditation(id),
    onSuccess: () => {
      toastSuccess("Méditation supprimée");
      void qc.invalidateQueries({ queryKey: queryKeys.meditations.all });
    },
    onError: (e) => toastError(e, "Impossible de supprimer la méditation"),
  });
}

export function useCreatePlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => adminApi.createPlan(planFromForm(formData)),
    onSuccess: () => {
      toastSuccess("Plan créé");
      void qc.invalidateQueries({ queryKey: queryKeys.plans.all });
    },
    onError: (e) => toastError(e, "Impossible de créer le plan"),
  });
}

export function useUpdatePlan(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => adminApi.updatePlan(id, planFromForm(formData)),
    onSuccess: () => {
      toastSuccess("Plan mis à jour");
      void qc.invalidateQueries({ queryKey: queryKeys.plans.all });
      void qc.invalidateQueries({ queryKey: queryKeys.plans.detail(id) });
    },
    onError: (e) => toastError(e, "Impossible de mettre à jour le plan"),
  });
}

export function useDeletePlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApi.deletePlan(id),
    onSuccess: () => {
      toastSuccess("Plan supprimé");
      void qc.invalidateQueries({ queryKey: queryKeys.plans.all });
    },
    onError: (e) => toastError(e, "Impossible de supprimer le plan"),
  });
}

export function useCreatePlanDay(planId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => adminApi.createPlanDay(planId, planDayFromForm(formData)),
    onSuccess: () => {
      toastSuccess("Jour ajouté");
      void qc.invalidateQueries({ queryKey: queryKeys.plans.days(planId) });
    },
    onError: (e) => toastError(e, "Impossible d'ajouter le jour"),
  });
}

export function useDeletePlanDay(planId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dayId: string) => adminApi.deletePlanDay(planId, dayId),
    onSuccess: () => {
      toastSuccess("Jour supprimé");
      void qc.invalidateQueries({ queryKey: queryKeys.plans.days(planId) });
    },
    onError: (e) => toastError(e, "Impossible de supprimer le jour"),
  });
}

export function useActivateSubscription() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApi.activateSubscription(id),
    onSuccess: () => {
      toastSuccess("Abonnement activé");
      void qc.invalidateQueries({ queryKey: queryKeys.subscriptions.all() });
    },
    onError: (e) => toastError(e, "Impossible d'activer l'abonnement"),
  });
}

export function useRejectSubscription() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApi.rejectSubscription(id),
    onSuccess: () => {
      toastSuccess("Abonnement rejeté");
      void qc.invalidateQueries({ queryKey: queryKeys.subscriptions.all() });
    },
    onError: (e) => toastError(e, "Impossible de rejeter l'abonnement"),
  });
}

export function useCreateSubscriptionPlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) =>
      adminApi.createSubscriptionPlan(subscriptionPlanFromForm(formData)),
    onSuccess: () => {
      toastSuccess("Formule créée");
      void qc.invalidateQueries({ queryKey: queryKeys.subscriptionPlans.all });
    },
    onError: (e) => toastError(e, "Impossible de créer la formule"),
  });
}

export function useUploadImage(folder: "plans" | "meditations" | "devotionals") {
  return useMutation({
    mutationFn: (file: File) => adminApi.uploadImage(file, folder),
    onSuccess: () => toastSuccess("Image uploadée"),
    onError: (e) => toastError(e, "Échec de l'upload image"),
  });
}

export function useUploadAudio() {
  return useMutation({
    mutationFn: (file: File) => adminApi.uploadAudio(file),
    onSuccess: () => toastSuccess("Audio uploadé"),
    onError: (e) => toastError(e, "Échec de l'upload audio"),
  });
}
