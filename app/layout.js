import "./globals.css";
import { Inter } from "next/font/google";
import Shell from "./shell";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const metadata = { title: "ByeWind Dashboard", description: "Overview dashboard" };
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased"><Shell>{children}</Shell></body>
    </html>
  );
}
