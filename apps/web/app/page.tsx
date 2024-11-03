import { Appbar } from "@/components/appbar";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero-section";

export default function Home() {
  return (
    <div>
      <Appbar/>
      <Hero/>
      <Features/>
      <Footer/>
    </div>
  );
}
