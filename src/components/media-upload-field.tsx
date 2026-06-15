"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ImageIcon, Loader2Icon, Music2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useUploadAudio, useUploadImage } from "@/hooks/use-admin-mutations";
import { ApiError } from "@/lib/api/client";
import { useUploadState } from "@/providers/upload-provider";
import { cn } from "@/lib/utils";

type MediaUploadFieldProps = {
  type: "image" | "audio";
  folder?: "plans" | "meditations" | "devotionals" | "expectations";
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
  const uploadKey = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(defaultUrl ?? "");
  const [publicId, setPublicId] = useState(defaultPublicId ?? "");
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultUrl ?? null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const blobRef = useRef<string | null>(null);

  const uploadImage = useUploadImage(folder);
  const uploadAudio = useUploadAudio();
  const { setUploading } = useUploadState();

  const loading = uploadImage.isPending || uploadAudio.isPending;

  useEffect(() => {
    setUploading(uploadKey, loading);
    return () => setUploading(uploadKey, false);
  }, [loading, setUploading, uploadKey]);

  useEffect(() => {
    setUrl(defaultUrl ?? "");
    setPublicId(defaultPublicId ?? "");
    setPreviewUrl(defaultUrl ?? null);
    setSelectedName(null);
    setUploadError(null);
  }, [defaultUrl, defaultPublicId]);

  useEffect(() => {
    return () => {
      if (blobRef.current) {
        URL.revokeObjectURL(blobRef.current);
        blobRef.current = null;
      }
    };
  }, []);

  function clearBlobPreview() {
    if (blobRef.current) {
      URL.revokeObjectURL(blobRef.current);
      blobRef.current = null;
    }
  }

  function setImagePreview(next: string | null) {
    clearBlobPreview();
    if (next?.startsWith("blob:")) {
      blobRef.current = next;
    }
    setPreviewUrl(next);
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setSelectedName(file.name);

    if (type === "image") {
      setImagePreview(URL.createObjectURL(file));
    }

    try {
      const result =
        type === "image"
          ? await uploadImage.mutateAsync(file)
          : await uploadAudio.mutateAsync(file);

      clearBlobPreview();
      setUrl(result.url);
      setPublicId(result.publicId);
      if (type === "image") {
        setPreviewUrl(result.url);
      }
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : error instanceof Error
            ? error.message
            : "Échec de l'upload. Réessayez.";
      setUploadError(message);
      if (type === "image" && !url) {
        clearBlobPreview();
        setPreviewUrl(defaultUrl ?? null);
      }
    } finally {
      e.target.value = "";
    }
  }

  return (
    <div className="space-y-3">
      {type === "image" ? (
        <div
          className={cn(
            "relative overflow-hidden rounded-lg border border-dashed border-border bg-muted/30",
            previewUrl ? "border-solid" : "",
          )}
        >
          <div className="flex aspect-video w-full items-center justify-center">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Aperçu"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 px-4 py-10 text-muted-foreground">
                <ImageIcon className="size-10 opacity-50" />
                <p className="text-sm">Aucune image — choisissez un fichier pour voir l&apos;aperçu</p>
              </div>
            )}
          </div>

          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-[1px]">
              <Loader2Icon className="size-8 animate-spin text-primary" />
            </div>
          ) : null}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4">
          <div className="flex items-center gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {loading ? (
                <Loader2Icon className="size-5 animate-spin" />
              ) : (
                <Music2Icon className="size-5" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {selectedName ?? (url ? "Audio enregistré" : "Aucun fichier audio")}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {url ? url : "Choisissez un fichier pour prévisualiser le nom avant l'upload"}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept={type === "image" ? "image/*" : "audio/*"}
          onChange={handleFile}
          disabled={loading}
          className="max-w-xs text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
        />
        {previewUrl || url ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={loading}
            onClick={() => {
              clearBlobPreview();
              setPreviewUrl(null);
              setUrl("");
              setPublicId("");
              setSelectedName(null);
              setUploadError(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
          >
            Retirer
          </Button>
        ) : null}
      </div>

      {selectedName && type === "image" && !loading ? (
        <p className="text-xs text-muted-foreground">Fichier sélectionné : {selectedName}</p>
      ) : null}

      {loading ? (
        <p className="text-sm text-muted-foreground">Upload en cours…</p>
      ) : null}

      {uploadError ? <p className="text-sm text-destructive">{uploadError}</p> : null}

      <input type="hidden" name={urlFieldName} value={url} />
      <input type="hidden" name={publicIdFieldName} value={publicId} />
    </div>
  );
}
