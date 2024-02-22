import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Europroescort",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full h-full">{children}</body>
    </html>
  );
}
