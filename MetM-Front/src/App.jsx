import React from "react";
import AppRouter from "./router/AppRouter";
import Signup from "./pages/Signup";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthModal } from "@/context/AuthModalContext";

function App() {
  const {
    showSignup,
    setShowSignup,
    showRegister,
    setShowRegister,
    postLoginRedirect,
  } = useAuthModal();

  const openLoginModal = () => {
    setShowRegister(false);
    setShowSignup(true);
  };

  const closeRegisterModal = () => {
    setShowRegister(false);
  };

  return (
    <>
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
    </>
  );
}

export default App;
