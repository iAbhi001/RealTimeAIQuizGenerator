import "./globals.css";
import { Inter } from "next/font/google";
import { ApolloWrapper } from "@/lib/ApolloWrapper";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen text-white bg-[#050505]`}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}