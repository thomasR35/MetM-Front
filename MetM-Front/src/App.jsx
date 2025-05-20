import PageMeta from "@/components/PageMeta";
import AppRouter from "./router/AppRouter";
import Signup from "./components/LoginModal";
import Register from "./components/RegisterModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthModal } from "@/context/AuthModalContext";
import { useConfirm } from "@/hooks/components/confirmDialog/useConfirm.jsx";

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

  const closeRegisterModal = () => {
    setShowRegister(false);
  };

  return (
    <>
      <PageMeta />
      <AppRouter />

      {showSignup && (
        <Signup
          closeModal={() => setShowSignup(false)}
          postLoginRedirect={postLoginRedirect}
          setShowRegister={setShowRegister}
        />
      )}

      {showRegister && (
        <div className="modal-overlay">
          <Register
            openLoginModal={openLoginModal}
            closeRegisterModal={closeRegisterModal}
          />
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
      <ConfirmUI />
    </>
  );
}

export default App;
