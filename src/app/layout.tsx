import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Social Shelf",
  description: "A social platform for book lovers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <AuthProvider>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
          <Toaster richColors closeButton position="top-right" />
        </body>
      </AuthProvider>
    </html>
  );
}
