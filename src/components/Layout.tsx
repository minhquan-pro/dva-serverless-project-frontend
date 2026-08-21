import { Outlet } from "react-router-dom";
import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";
import { CartDrawer } from "./CartDrawer";

export function Layout() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
