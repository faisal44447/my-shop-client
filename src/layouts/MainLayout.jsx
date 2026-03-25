import { Outlet } from "react-router-dom";
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from "../pages/shared/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      
    </div>
  );
};

export default MainLayout;