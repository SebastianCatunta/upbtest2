import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Casa Café | Tu nueva pausa favorita",
  description: "Café de especialidad, momentos simples y un espacio para disfrutar sin prisa.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
