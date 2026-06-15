export const queryKeys = {
  dashboard: {
    stats: ["dashboard", "stats"] as const,
  },
  devotionals: {
    all: ["devotionals"] as const,
    detail: (id: string) => ["devotionals", id] as const,
  },
  meditations: {
    all: ["meditations"] as const,
    detail: (id: string) => ["meditations", id] as const,
  },
  expectations: {
    all: ["expectations"] as const,
    detail: (id: string) => ["expectations", id] as const,
  },
  plans: {
    all: ["plans"] as const,
    categories: ["plans", "categories"] as const,
    categoriesAdmin: ["plans", "categories", "admin"] as const,
    detail: (id: string) => ["plans", id] as const,
    days: (planId: string) => ["plans", planId, "days"] as const,
  },
  versions: {
    all: ["bible-versions"] as const,
  },
  subscriptions: {
    all: (status?: string) => ["subscriptions", status ?? "all"] as const,
  },
  subscriptionPlans: {
    all: ["subscription-plans"] as const,
  },
  users: {
    all: ["users"] as const,
  },
};
