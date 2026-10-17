import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Panel de productos | API backendUpb",
  description: "Prueba el catálogo de productos y los endpoints del backend en Render.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
