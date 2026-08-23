import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import PageTransition from "../components/common/PageTransition";

function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="qk-site-main">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </div>
      <Footer />
    </>
  );
}

export default MainLayout;
