// src/App.jsx
// ========================
import { createPortal } from "react-dom";
import PageMeta from "@/components/PageMeta";
import AppRouter from "./router/AppRouter";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthModal } from "@/context/AuthModalContext";
import { useConfirm } from "@/hooks/components/confirmDialog/useConfirm.jsx";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const {
    showSignup,
    setShowSignup,
    showRegister,
    setShowRegister,
    postLoginRedirect,
  } = useAuthModal();

  const { ConfirmUI } = useConfirm();

  const openLoginModal = () => {
    setShowRegister(false);
    setShowSignup(true);
  };

  const openRegisterModal = () => {
    setShowSignup(false);
    setShowRegister(true);
  };

  const closeAll = () => {
    setShowSignup(false);
    setShowRegister(false);
  };

  return (
    <>
      <PageMeta />
      <AppRouter />

      {/* LoginModal — portal vers document.body */}
      {showSignup &&
        createPortal(
          <LoginModal
            onClose={closeAll}
            onSwitchToRegister={openRegisterModal}
            postLoginRedirect={postLoginRedirect}
          />,
          document.body,
        )}

      {/* RegisterModal — portal vers document.body */}
      {showRegister &&
        createPortal(
          <RegisterModal onClose={closeAll} onSwitchToLogin={openLoginModal} />,
          document.body,
        )}

      <ToastContainer position="top-right" autoClose={3000} />
      <ScrollToTop />
      <ConfirmUI />
    </>
  );
}

export default App;
