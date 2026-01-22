import "./globals.css";
import { ApolloWrapper } from "@/lib/ApolloWrapper";
import Navbar from "@/components/NavBar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-white antialiased">
        <ApolloWrapper>
          <Navbar />
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}