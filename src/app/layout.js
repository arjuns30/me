import "../styles/globals.css";
//import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "Arjun Suri's Portfolio",
  description: "Come Learn About Me! (built in React & Tailwind)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}