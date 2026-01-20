import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import GitHubStatsReal from "@/components/GitHubStatsReal";
import BlockchainExpertise from "@/components/BlockchainExpertise";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <GitHubStatsReal />
        <BlockchainExpertise />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
