export type UploadResult = {
  url: string;
  publicId: string;
  resourceType: "image" | "video" | "raw";
  bytes: number;
  width?: number;
  height?: number;
  duration?: number;
};

export type BibleVersion = {
  id: string;
  code: string;
  name: string;
  language: string;
  isDefault: boolean;
  downloadUrl: string | null;
  bundleSize: number | null;
};

export type Subscription = {
  id: string;
  userId: string;
  status: string;
  provider: string;
  phoneNumber: string;
  externalRef: string | null;
  createdAt: string;
};

export type SubscriptionPlan = {
  id: string;
  name: string;
  priceXaf: number;
  durationDays: number;
  isActive: boolean;
};

export type AppUser = {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  subscriptionStatus: string;
  subscriptionExpiresAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PlanDay = {
  id: string;
  dayNumber: number;
  readings: Array<{ book: string; chapterStart: number }>;
};

export type PlanCategory = {
  id: string;
  labelFr: string;
  labelEn: string;
};

export type DashboardStats = {
  devotionals: number;
  plans: number;
  meditations: number;
  versions: number;
};

export type ExpectationVerse = {
  id: string;
  sortOrder: number;
  referenceFr: string;
  referenceEn: string | null;
  excerptFr: string;
  excerptEn: string | null;
  tagFr: string | null;
  tagEn: string | null;
};

export type Expectation = {
  id: string;
  labelFr: string;
  labelEn: string;
  descriptionFr: string | null;
  descriptionEn: string | null;
  planCategoryTag: string | null;
  estimatedMinutes: number;
  thumbnailUrl: string | null;
  iconKey: string | null;
  sortOrder: number;
  isActive: boolean;
  verses: ExpectationVerse[];
};
