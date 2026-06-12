"use client";

import { ContentForm, FormField, FormSelect } from "@/components/content-form";
import { MediaUploadField } from "@/components/media-upload-field";
import { usePlanCategories } from "@/hooks/use-admin-queries";

type PlanFormProps = {
  onSubmit: (formData: FormData) => Promise<unknown>;
  isPending?: boolean;
  error?: string | null;
  defaultValues?: Record<string, unknown>;
  submitLabel?: string;
};

export function PlanFormFields({
  onSubmit,
  isPending,
  error,
  defaultValues,
  submitLabel = "Enregistrer",
}: PlanFormProps) {
  const { data: categories = [], isLoading } = usePlanCategories();
  const currentCategory = String(defaultValues?.category ?? "reading");
  const categoryOptions = categories.some((category) => category.id === currentCategory)
    ? categories
    : currentCategory
      ? [
          { id: currentCategory, labelFr: currentCategory, labelEn: currentCategory },
          ...categories,
        ]
      : categories;

  return (
    <ContentForm onSubmit={onSubmit} isPending={isPending} error={error} submitLabel={submitLabel}>
      <FormField label="Nom" name="name" defaultValue={String(defaultValues?.name ?? "")} required />
      <FormField
        label="Description"
        name="description"
        as="textarea"
        defaultValue={String(defaultValues?.description ?? "")}
      />
      <FormField
        label="Durée (jours)"
        name="durationDays"
        type="number"
        defaultValue={Number(defaultValues?.durationDays ?? 30)}
        required
      />
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Chargement des catégories…</p>
      ) : (
        <FormSelect
          label="Catégorie"
          name="category"
          defaultValue={currentCategory}
          required
          options={categoryOptions.map((category) => ({
            value: category.id,
            label: category.labelFr,
          }))}
        />
      )}
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="isPremium" defaultChecked={Boolean(defaultValues?.isPremium)} />
        Plan premium
      </label>
      <div>
        <p className="mb-2 text-sm font-medium">Vignette</p>
        <MediaUploadField
          type="image"
          folder="plans"
          urlFieldName="thumbnailUrl"
          publicIdFieldName="thumbnailPublicId"
          defaultUrl={defaultValues?.thumbnailUrl as string | null}
          defaultPublicId={defaultValues?.thumbnailPublicId as string | null}
        />
      </div>
    </ContentForm>
  );
}
