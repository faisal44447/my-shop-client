import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar/Navbar";
import Footer from "../pages/shared/Footer";
import Banner from "../pages/Home/Banner/Banner";
import Category from '../pages/Home/Category/Category';
import Contact from '../pages/Home/Contact/Contact';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Category />
      <Outlet />
      <Contact />
      <Footer />
    </div>
  );
};

export default MainLayout; 