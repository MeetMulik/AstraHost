import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import HeroCta from "@/components/home/cta-hero";
import HeroExplore from "@/components/home/explore-section";
import HeroBanner from "@/components/home/banner-hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1">
        <Hero />
        <HeroCta />
        <HeroExplore />
        <HeroBanner />
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-" />
    </div>
  );
}
