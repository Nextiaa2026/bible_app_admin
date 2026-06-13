"use client";

import { ContentForm, FormField } from "@/components/content-form";
import { DatePicker } from "@/components/ui/date-picker";

type PrayerFormProps = {
  onSubmit: (formData: FormData) => Promise<unknown>;
  isPending?: boolean;
  error?: string | null;
  defaultValues?: Record<string, unknown>;
  submitLabel?: string;
};

export function PrayerFormFields({
  onSubmit,
  isPending,
  error,
  defaultValues,
  submitLabel = "Enregistrer",
}: PrayerFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <ContentForm onSubmit={onSubmit} isPending={isPending} error={error} submitLabel={submitLabel}>
      <DatePicker
        label="Date"
        name="date"
        defaultValue={String(defaultValues?.date ?? today)}
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
        defaultValue={String(defaultValues?.prayerText ?? defaultValues?.prayer ?? "")}
        required
      />
    </ContentForm>
  );
}
