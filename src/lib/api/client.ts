import axios, { type AxiosInstance, isAxiosError } from "axios";
import { getSession } from "next-auth/react";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

function toApiError(error: unknown): never {
  if (isAxiosError(error)) {
    const status = error.response?.status ?? 500;
    const data = error.response?.data as { error?: string } | undefined;
    throw new ApiError(status, data?.error ?? error.message ?? "Request failed");
  }
  throw error;
}

function attachErrorInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => response,
    (error) => toApiError(error),
  );
}

export const publicApi = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});
attachErrorInterceptor(publicApi);

export const adminApi = axios.create({
  baseURL: `${API_URL}/admin`,
  headers: { "Content-Type": "application/json" },
});

adminApi.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});
attachErrorInterceptor(adminApi);

/** Multipart uploads — no default JSON content-type. */
export const adminUploadApi = axios.create({
  baseURL: `${API_URL}/admin`,
});

adminUploadApi.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});
attachErrorInterceptor(adminUploadApi);
