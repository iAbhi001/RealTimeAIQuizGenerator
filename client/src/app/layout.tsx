import "./globals.css";
import { ApolloWrapper } from "@/lib/ApolloWrapper";
// Change NavBar to Navbar (lowercase 'b')
import Navbar from "@/components/Navbar"; 

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