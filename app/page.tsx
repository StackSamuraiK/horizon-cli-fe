import Image from "next/image";
import { Hero } from "./components/hero";
import { AppBar } from "./components/appbar";

export default function Home() {
  return (
    <div>
      <AppBar />
      <Hero />
    </div>
  );
}
