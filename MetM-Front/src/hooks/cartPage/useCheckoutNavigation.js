// src/hooks/useCheckoutNavigation.js
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";

export function useCheckoutNavigation() {
  const { isAuthenticated } = useAuth();
  const { setShowSignup, setPostLoginRedirect } = useAuthModal();
  const navigate = useNavigate();

  const handleCheckoutClick = useCallback(() => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      setPostLoginRedirect("/checkout");
      setShowSignup(true);
    }
  }, [isAuthenticated, navigate, setPostLoginRedirect, setShowSignup]);

  return { isAuthenticated, handleCheckoutClick };
}
