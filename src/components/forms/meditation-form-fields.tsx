"use client";

import { ContentForm, FormField } from "@/components/content-form";
import { MediaUploadField } from "@/components/media-upload-field";

type MeditationFormProps = {
  onSubmit: (formData: FormData) => Promise<unknown>;
  isPending?: boolean;
  error?: string | null;
  defaultValues?: Record<string, unknown>;
  submitLabel?: string;
};

export function MeditationFormFields({
  onSubmit,
  isPending,
  error,
  defaultValues,
  submitLabel = "Enregistrer",
}: MeditationFormProps) {
  return (
    <ContentForm onSubmit={onSubmit} isPending={isPending} error={error} submitLabel={submitLabel}>
      <FormField label="Titre" name="title" defaultValue={String(defaultValues?.title ?? "")} required />
      <FormField
        label="Description"
        name="description"
        as="textarea"
        defaultValue={String(defaultValues?.description ?? "")}
      />
      <FormField
        label="Catégorie"
        name="category"
        defaultValue={String(defaultValues?.category ?? "prière")}
        required
      />
      <FormField
        label="Durée (secondes)"
        name="durationSec"
        type="number"
        defaultValue={Number(defaultValues?.durationSec ?? 300)}
        required
      />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="isPremium" defaultChecked={Boolean(defaultValues?.isPremium)} />
        Contenu premium
      </label>
      <div>
        <p className="mb-2 text-sm font-medium">Vignette</p>
        <MediaUploadField
          type="image"
          folder="meditations"
          urlFieldName="thumbnailUrl"
          publicIdFieldName="thumbnailPublicId"
          defaultUrl={defaultValues?.thumbnailUrl as string | null}
          defaultPublicId={defaultValues?.thumbnailPublicId as string | null}
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Audio</p>
        <MediaUploadField
          type="audio"
          urlFieldName="audioUrl"
          publicIdFieldName="audioPublicId"
          defaultUrl={defaultValues?.audioUrl as string | null}
          defaultPublicId={defaultValues?.audioPublicId as string | null}
        />
      </div>
    </ContentForm>
  );
}
