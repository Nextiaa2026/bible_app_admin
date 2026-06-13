"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type UploadContextValue = {
  isUploading: boolean;
  setUploading: (key: string, uploading: boolean) => void;
};

const UploadContext = createContext<UploadContextValue | null>(null);

export function UploadProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState<Record<string, boolean>>({});

  const setUploading = useCallback((key: string, uploading: boolean) => {
    setPending((current) => {
      if (uploading) {
        return { ...current, [key]: true };
      }
      const next = { ...current };
      delete next[key];
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      isUploading: Object.keys(pending).length > 0,
      setUploading,
    }),
    [pending, setUploading],
  );

  return <UploadContext.Provider value={value}>{children}</UploadContext.Provider>;
}

export function useUploadState() {
  const ctx = useContext(UploadContext);
  if (!ctx) {
    throw new Error("useUploadState must be used within UploadProvider");
  }
  return ctx;
}
