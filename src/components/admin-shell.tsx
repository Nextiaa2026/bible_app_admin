import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  description?: string;
  action?: ReactNode;
};

export function AdminPageHeader({ description, action }: AdminPageHeaderProps) {
  if (!description && !action) return null;

  return (
    <div
      className={`mb-6 flex flex-col gap-3 sm:flex-row sm:items-center ${
        description && action ? "sm:justify-between" : action ? "sm:justify-end" : ""
      }`}
    >
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      {action}
    </div>
  );
}

export function AdminShell({
  description,
  action,
  children,
}: AdminPageHeaderProps & { children: ReactNode; title?: string }) {
  return (
    <div className="mx-auto w-full max-w-7xl p-6 lg:p-8">
      <AdminPageHeader description={description} action={action} />
      {children}
    </div>
  );
}
