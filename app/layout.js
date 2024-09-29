import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/auth-provider";
import { ToastProvider } from "@/components/ui/use-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crime Reporting App",
  description: "Community-driven crime reporting and management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider>
            <main className="px-10">
              <Navbar />
              {children}
            </main>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
