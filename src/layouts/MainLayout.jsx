import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
const MainLayout = () => {
  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      <Navbar />
      <div className="pt-24 min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
