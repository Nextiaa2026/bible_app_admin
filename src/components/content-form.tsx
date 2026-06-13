"use client";

import type { FormEvent, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { useUploadState } from "@/providers/upload-provider";

type ContentFormProps = {
  onSubmit: (formData: FormData) => Promise<unknown>;
  children: ReactNode;
  submitLabel?: string;
  isPending?: boolean;
  error?: string | null;
};

export function ContentForm({
  onSubmit,
  children,
  submitLabel = "Enregistrer",
  isPending = false,
  error,
}: ContentFormProps) {
  const { isUploading } = useUploadState();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isUploading) return;
    await onSubmit(new FormData(e.currentTarget));
  }

  const disabled = isPending || isUploading;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error ? <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p> : null}
      {children}
      <Button type="submit" disabled={disabled} className="w-full">
        {isUploading ? "Upload en cours…" : isPending ? "Enregistrement…" : submitLabel}
      </Button>
    </form>
  );
}

export function FormField({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  as = "input",
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  type?: string;
  required?: boolean;
  as?: "input" | "textarea";
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue}
          required={required}
          rows={5}
          className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue}
          required={required}
          className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm"
        />
      )}
    </div>
  );
}

export function FormSelect({
  label,
  name,
  defaultValue,
  required,
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
