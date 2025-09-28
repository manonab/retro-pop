import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
  return (
      <div className="min-h-screen bg-background">
          <Header/>
          <main>
              <HeroSection/>
              <FeaturedProducts />
          </main>
          <Footer/>
      </div>
  );
}
