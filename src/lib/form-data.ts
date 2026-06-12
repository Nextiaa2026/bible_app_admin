export function str(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  if (v == null || v === "") return null;
  return String(v);
}

export function devotionalFromForm(formData: FormData) {
  return {
    title: formData.get("title"),
    body: formData.get("body"),
    date: formData.get("date"),
    versionCode: str(formData, "versionCode"),
    scriptureReference: str(formData, "scriptureReference"),
    scriptureText: str(formData, "scriptureText"),
    prayerText: str(formData, "prayerText"),
    thumbnailUrl: str(formData, "thumbnailUrl"),
    thumbnailPublicId: str(formData, "thumbnailPublicId"),
  };
}

export function meditationFromForm(formData: FormData) {
  return {
    title: formData.get("title"),
    description: str(formData, "description"),
    category: formData.get("category"),
    durationSec: Number(formData.get("durationSec")),
    isPremium: formData.get("isPremium") === "on",
    audioUrl: str(formData, "audioUrl"),
    audioPublicId: str(formData, "audioPublicId"),
    thumbnailUrl: str(formData, "thumbnailUrl"),
    thumbnailPublicId: str(formData, "thumbnailPublicId"),
  };
}

export function planFromForm(formData: FormData) {
  return {
    name: formData.get("name"),
    description: str(formData, "description"),
    durationDays: Number(formData.get("durationDays")),
    category: str(formData, "category") ?? "reading",
    isPremium: formData.get("isPremium") === "on",
    thumbnailUrl: str(formData, "thumbnailUrl"),
    thumbnailPublicId: str(formData, "thumbnailPublicId"),
  };
}

export function planDayFromForm(formData: FormData) {
  return {
    dayNumber: Number(formData.get("dayNumber")),
    readings: JSON.parse(String(formData.get("readings") || "[]")),
  };
}

export function subscriptionPlanFromForm(formData: FormData) {
  return {
    name: formData.get("name"),
    priceXaf: Number(formData.get("priceXaf")),
    durationDays: Number(formData.get("durationDays")),
    isActive: formData.get("isActive") === "on",
  };
}
