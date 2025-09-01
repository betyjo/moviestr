import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata = { title: "MovieStudio", description: "Silver/black streaming" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <NavBar />
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
