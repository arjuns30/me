import "../styles/globals.css";

export const metadata = {
  title: "Arjun Suri",
  description:
    "Industrial and Operations Engineering at the University of Michigan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Grammarly can inject attributes on body before hydration. Keep this escape hatch local. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
