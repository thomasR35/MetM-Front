import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../styles/utils/_global.scss";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
