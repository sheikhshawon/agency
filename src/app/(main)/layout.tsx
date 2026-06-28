import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageStars from "@/components/layout/PageStars";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Fixed star field — sits behind all content via z-index: 0 */}
      <PageStars />

      {/* All content sits above the star field; section backgrounds are transparent */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
