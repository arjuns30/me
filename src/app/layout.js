import "../styles/globals.css";

export const metadata = {
  title: "Arjun Suri | Portfolio",
  description: "A sleek personal website built with React & Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}