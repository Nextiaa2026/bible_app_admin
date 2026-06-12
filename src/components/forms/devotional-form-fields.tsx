"use client";

import { ContentForm, FormField } from "@/components/content-form";
import { MediaUploadField } from "@/components/media-upload-field";

type DevotionalFormProps = {
  onSubmit: (formData: FormData) => Promise<unknown>;
  isPending?: boolean;
  error?: string | null;
  defaultValues?: Record<string, unknown>;
  submitLabel?: string;
};

export function DevotionalFormFields({
  onSubmit,
  isPending,
  error,
  defaultValues,
  submitLabel = "Enregistrer",
}: DevotionalFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <ContentForm onSubmit={onSubmit} isPending={isPending} error={error} submitLabel={submitLabel}>
      <FormField
        label="Date"
        name="date"
        type="date"
        defaultValue={String(defaultValues?.date ?? today)}
        required
      />
      <FormField label="Titre" name="title" defaultValue={String(defaultValues?.title ?? "")} required />
      <FormField
        label="Corps"
        name="body"
        as="textarea"
        defaultValue={String(defaultValues?.body ?? "")}
        required
      />
      <FormField
        label="Référence biblique"
        name="scriptureReference"
        defaultValue={String(defaultValues?.scriptureReference ?? "")}
      />
      <FormField
        label="Texte biblique"
        name="scriptureText"
        as="textarea"
        defaultValue={String(defaultValues?.scriptureText ?? "")}
      />
      <FormField
        label="Prière"
        name="prayerText"
        as="textarea"
        defaultValue={String(defaultValues?.prayerText ?? "")}
      />
      <FormField
        label="Version"
        name="versionCode"
        defaultValue={String(defaultValues?.versionCode ?? "LSG1910")}
      />
      <div>
        <p className="mb-2 text-sm font-medium">Vignette</p>
        <MediaUploadField
          type="image"
          folder="devotionals"
          urlFieldName="thumbnailUrl"
          publicIdFieldName="thumbnailPublicId"
          defaultUrl={defaultValues?.thumbnailUrl as string | null}
          defaultPublicId={defaultValues?.thumbnailPublicId as string | null}
        />
      </div>
    </ContentForm>
  );
}
