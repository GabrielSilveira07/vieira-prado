import ConsultProvider from "@/components/consult/ConsultProvider";
import Backdrop from "@/components/layout/Backdrop";
import Cursor from "@/components/layout/Cursor";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Loader from "@/components/layout/Loader";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Areas from "@/components/sections/Areas";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Method from "@/components/sections/Method";
import Office from "@/components/sections/Office";
import Space from "@/components/sections/Space";
import Team from "@/components/sections/Team";
import Effects from "@/components/ui/Effects";

export default function Home() {
  return (
    <ConsultProvider>
      <Loader />
      <Backdrop />
      <SmoothScroll />
      <Effects />
      <Cursor />
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <Office />
        <Method />
        <Areas />
        <Team />
        <Space />
        <Contact />
      </main>
      <Footer />
    </ConsultProvider>
  );
}
