"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { useUploadAudio, useUploadImage } from "@/hooks/use-admin-mutations";

type MediaUploadFieldProps = {
  type: "image" | "audio";
  folder?: "plans" | "meditations" | "devotionals";
  urlFieldName: string;
  publicIdFieldName: string;
  defaultUrl?: string | null;
  defaultPublicId?: string | null;
};

export function MediaUploadField({
  type,
  folder = "meditations",
  urlFieldName,
  publicIdFieldName,
  defaultUrl,
  defaultPublicId,
}: MediaUploadFieldProps) {
  const [url, setUrl] = useState(defaultUrl ?? "");
  const [publicId, setPublicId] = useState(defaultPublicId ?? "");
  const uploadImage = useUploadImage(folder);
  const uploadAudio = useUploadAudio();

  const loading = uploadImage.isPending || uploadAudio.isPending;

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const result =
      type === "image" ? await uploadImage.mutateAsync(file) : await uploadAudio.mutateAsync(file);
    setUrl(result.url);
    setPublicId(result.publicId);
  }

  return (
    <div className="space-y-2">
      <Input type="file" accept={type === "image" ? "image/*" : "audio/*"} onChange={handleFile} />
      {loading ? <p className="text-sm text-muted-foreground">Upload en cours…</p> : null}
      {url ? (
        type === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="h-20 w-20 rounded-lg object-cover" />
        ) : (
          <p className="text-sm text-muted-foreground">Audio uploadé</p>
        )
      ) : null}
      <input type="hidden" name={urlFieldName} value={url} />
      <input type="hidden" name={publicIdFieldName} value={publicId} />
    </div>
  );
}
