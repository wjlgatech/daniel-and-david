import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Builder Loop Coach",
  description: "A voice-first AI coach that guides your family through one Builder Loop.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
