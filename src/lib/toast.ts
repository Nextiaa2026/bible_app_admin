import { toast } from "sonner";

export function toastSuccess(message: string) {
  toast.success(message);
}

export function toastError(error: unknown, fallback = "Une erreur est survenue") {
  const message = error instanceof Error ? error.message : fallback;
  toast.error(message);
}
