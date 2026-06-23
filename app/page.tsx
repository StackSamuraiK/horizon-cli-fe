import { Hero } from "./components/hero";
import { AppBar } from "./components/appbar";
import { AgentSection } from "./components/agent";
import { Usage } from "./components/usage";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <div>
      <AppBar />
      <Hero />
      <AgentSection />
      <Usage />
      <Footer />
    </div>
  );
}
