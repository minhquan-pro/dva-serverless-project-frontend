import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Menu } from "./sections/Menu";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";

function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>
        <Hero />
        <Menu />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
