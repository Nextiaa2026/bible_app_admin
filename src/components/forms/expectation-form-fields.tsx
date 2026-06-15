"use client";

import { useState, type FormEvent } from "react";

import { FormField } from "@/components/content-form";
import { MediaUploadField } from "@/components/media-upload-field";
import { Button } from "@/components/ui/button";
import type { ExpectationVerse } from "@/lib/api/types";

type ExpectationFormProps = {
  onSubmit: (formData: FormData) => Promise<unknown>;
  isPending?: boolean;
  error?: string | null;
  defaultValues?: Record<string, unknown>;
  submitLabel?: string;
  mode?: "create" | "update";
};

type VerseDraft = {
  referenceFr: string;
  referenceEn: string;
  excerptFr: string;
  excerptEn: string;
  tagFr: string;
  tagEn: string;
};

const EMPTY_VERSE: VerseDraft = {
  referenceFr: "",
  referenceEn: "",
  excerptFr: "",
  excerptEn: "",
  tagFr: "",
  tagEn: "",
};

function versesFromDefaults(defaultValues?: Record<string, unknown>): VerseDraft[] {
  const verses = (defaultValues?.verses as ExpectationVerse[] | undefined) ?? [];
  if (verses.length === 0) return [{ ...EMPTY_VERSE }];

  return verses.map((verse) => ({
    referenceFr: verse.referenceFr ?? "",
    referenceEn: verse.referenceEn ?? "",
    excerptFr: verse.excerptFr ?? "",
    excerptEn: verse.excerptEn ?? "",
    tagFr: verse.tagFr ?? "",
    tagEn: verse.tagEn ?? "",
  }));
}

function toPayload(verses: VerseDraft[]) {
  return verses
    .filter((verse) => verse.referenceFr.trim() && verse.excerptFr.trim())
    .map((verse, index) => ({
      referenceFr: verse.referenceFr.trim(),
      referenceEn: verse.referenceEn.trim() || null,
      excerptFr: verse.excerptFr.trim(),
      excerptEn: verse.excerptEn.trim() || null,
      tagFr: verse.tagFr.trim() || null,
      tagEn: verse.tagEn.trim() || null,
      sortOrder: index + 1,
    }));
}

export function ExpectationFormFields({
  onSubmit,
  isPending,
  error,
  defaultValues,
  submitLabel = "Enregistrer",
  mode = "create",
}: ExpectationFormProps) {
  const [verses, setVerses] = useState<VerseDraft[]>(() => versesFromDefaults(defaultValues));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("verses", JSON.stringify(toPayload(verses)));
    await onSubmit(formData);
  }

  function updateVerse(index: number, patch: Partial<VerseDraft>) {
    setVerses((current) =>
      current.map((verse, i) => (i === index ? { ...verse, ...patch } : verse)),
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error ? (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
      ) : null}

      {mode === "create" ? (
        <FormField
          label="Identifiant (slug)"
          name="id"
          defaultValue={String(defaultValues?.id ?? "")}
          required
        />
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Libellé (FR)"
          name="labelFr"
          defaultValue={String(defaultValues?.labelFr ?? "")}
          required
        />
        <FormField
          label="Libellé (EN)"
          name="labelEn"
          defaultValue={String(defaultValues?.labelEn ?? "")}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Description (FR)"
          name="descriptionFr"
          as="textarea"
          defaultValue={String(defaultValues?.descriptionFr ?? "")}
        />
        <FormField
          label="Description (EN)"
          name="descriptionEn"
          as="textarea"
          defaultValue={String(defaultValues?.descriptionEn ?? "")}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <FormField
          label="Catégorie plan"
          name="planCategoryTag"
          defaultValue={String(defaultValues?.planCategoryTag ?? "")}
        />
        <FormField
          label="Durée (min)"
          name="estimatedMinutes"
          type="number"
          defaultValue={Number(defaultValues?.estimatedMinutes ?? 15)}
          required
        />
        <FormField
          label="Ordre"
          name="sortOrder"
          type="number"
          defaultValue={Number(defaultValues?.sortOrder ?? 0)}
        />
      </div>

      <FormField
        label="Clé icône"
        name="iconKey"
        defaultValue={String(defaultValues?.iconKey ?? defaultValues?.id ?? "")}
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={defaultValues?.isActive !== false}
        />
        Actif (visible dans l&apos;app)
      </label>

      <div>
        <p className="mb-2 text-sm font-medium">Vignette</p>
        <MediaUploadField
          type="image"
          folder="expectations"
          urlFieldName="thumbnailUrl"
          publicIdFieldName="thumbnailPublicId"
          defaultUrl={defaultValues?.thumbnailUrl as string | null}
          defaultPublicId={defaultValues?.thumbnailPublicId as string | null}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Versets ({verses.length})</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setVerses((current) => [...current, { ...EMPTY_VERSE }])}
          >
            Ajouter un verset
          </Button>
        </div>

        {verses.map((verse, index) => (
          <div key={index} className="space-y-3 rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Verset {index + 1}</p>
              {verses.length > 1 ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setVerses((current) => current.filter((_, i) => i !== index))}
                >
                  Supprimer
                </Button>
              ) : null}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium">Référence (FR)</label>
                <input
                  value={verse.referenceFr}
                  onChange={(e) => updateVerse(index, { referenceFr: e.target.value })}
                  required
                  className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Référence (EN)</label>
                <input
                  value={verse.referenceEn}
                  onChange={(e) => updateVerse(index, { referenceEn: e.target.value })}
                  className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Extrait (FR)</label>
              <textarea
                value={verse.excerptFr}
                onChange={(e) => updateVerse(index, { excerptFr: e.target.value })}
                required
                rows={2}
                className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Extrait (EN)</label>
              <textarea
                value={verse.excerptEn}
                onChange={(e) => updateVerse(index, { excerptEn: e.target.value })}
                rows={2}
                className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium">Tag (FR)</label>
                <input
                  value={verse.tagFr}
                  onChange={(e) => updateVerse(index, { tagFr: e.target.value })}
                  className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Tag (EN)</label>
                <input
                  value={verse.tagEn}
                  onChange={(e) => updateVerse(index, { tagEn: e.target.value })}
                  className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Enregistrement…" : submitLabel}
      </Button>
    </form>
  );
}
