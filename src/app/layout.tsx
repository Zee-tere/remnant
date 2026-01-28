import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // Import Footer

export const metadata = {
  title: "Remnant",
  description: "A place to sell unused and single items",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black flex flex-col min-h-screen">
        <Navbar /> {/* Navbar remains unchanged */}
        
        <main className="flex-grow">{children}</main> {/* Ensures content pushes footer down */}

        <Footer /> {/* Footer added at the bottom */}
      </body>
    </html>
  );
}
