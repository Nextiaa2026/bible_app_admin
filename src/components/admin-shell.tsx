import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function AdminShell({
  title,
  description,
  action,
  children,
}: AdminPageHeaderProps & { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl p-6 lg:p-8">
      <AdminPageHeader title={title} description={description} action={action} />
      {children}
    </div>
  );
}
