// src/layouts/MainLayout.jsx
// ========================
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MainLayout = ({
  children,
  setShowSignup,
  setShowRegister,
  setPostLoginRedirect,
}) => {
  return (
    <div className="main-layout">
      <Navbar
        setShowSignup={setShowSignup}
        setShowRegister={setShowRegister}
        setPostLoginRedirect={setPostLoginRedirect}
      />
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
