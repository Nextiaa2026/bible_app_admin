import { Figtree } from "next/font/google";

import { AdminLayoutShell } from "@/components/admin-layout-shell";
import { AuthSessionProvider } from "@/components/session-provider";
import { SonnerToaster } from "@/components/sonner-toaster";
import { QueryProvider } from "@/providers/query-provider";
import { UploadProvider } from "@/providers/upload-provider";
import { cn } from "@/lib/utils";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Admin — Le Guide du Chrétien",
  description: "Panneau d'administration",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={cn("font-sans", figtree.variable)}>
      <body className="bg-background">
        <AuthSessionProvider>
          <QueryProvider>
            <UploadProvider>
              <AdminLayoutShell>{children}</AdminLayoutShell>
              <SonnerToaster />
            </UploadProvider>
          </QueryProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
