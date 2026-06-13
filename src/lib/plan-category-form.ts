export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function planCategoryFromForm(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const labelFr = String(formData.get("labelFr") ?? "").trim();
  const labelEn = String(formData.get("labelEn") ?? "").trim();

  return { id, labelFr, labelEn };
}
