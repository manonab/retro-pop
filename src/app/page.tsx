import Hero from "@/components/Hero";
import CategoryGrid from "@/components/catalog/CatalogGrid";

export default function Home() {
  return (
      <div className="min-h-screen bg-background">
          <main>
              <Hero/>
              <CategoryGrid />
          </main>
      </div>
  );
}
