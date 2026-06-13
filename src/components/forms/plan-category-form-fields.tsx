"use client";

import { useState } from "react";

import { ContentForm } from "@/components/content-form";
import { slugify } from "@/lib/plan-category-form";

type PlanCategoryFormFieldsProps = {
  onSubmit: (formData: FormData) => Promise<unknown>;
  isPending?: boolean;
  error?: string | null;
  submitLabel?: string;
};

const fieldClassName =
  "w-full rounded-lg border border-input bg-white px-3 py-2 text-sm";

export function PlanCategoryFormFields({
  onSubmit,
  isPending,
  error,
  submitLabel = "Créer la catégorie",
}: PlanCategoryFormFieldsProps) {
  const [id, setId] = useState("");
  const [labelFr, setLabelFr] = useState("");
  const [labelEn, setLabelEn] = useState("");
  const [idTouched, setIdTouched] = useState(false);

  function handleLabelFrChange(value: string) {
    setLabelFr(value);
    if (!idTouched) {
      setId(slugify(value));
    }
  }

  return (
    <ContentForm onSubmit={onSubmit} isPending={isPending} error={error} submitLabel={submitLabel}>
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="labelFr">
          Libellé français
        </label>
        <input
          id="labelFr"
          name="labelFr"
          value={labelFr}
          onChange={(event) => handleLabelFrChange(event.target.value)}
          required
          className={fieldClassName}
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="labelEn">
          Libellé anglais
        </label>
        <input
          id="labelEn"
          name="labelEn"
          value={labelEn}
          onChange={(event) => setLabelEn(event.target.value)}
          required
          className={fieldClassName}
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="id">
          Identifiant (slug)
        </label>
        <input
          id="id"
          name="id"
          value={id}
          onChange={(event) => {
            setIdTouched(true);
            setId(event.target.value);
          }}
          required
          pattern="[a-z0-9-]+"
          className={`${fieldClassName} font-mono`}
          placeholder="ex. famille"
        />
        <p className="text-xs text-muted-foreground">
          Lettres minuscules, chiffres et tirets uniquement. Utilisé dans l&apos;application mobile.
        </p>
      </div>
    </ContentForm>
  );
}
