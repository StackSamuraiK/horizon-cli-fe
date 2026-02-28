import Image from "next/image";
import { Hero } from "./components/hero";
import { AppBar } from "./components/appbar";
import { Usage } from "./components/usage";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <div>
      <AppBar />
      <Hero />
      <Usage />
      <Footer />
    </div>
  );
}
