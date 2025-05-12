// src/hooks/navBar/useNavbar.js
//=========================================
import { useState, useCallback, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { toast } from "react-toastify";

/**
 * Hook qui regroupe toute la logique (state, context, handlers)
 * pour la barre de navigation.
 */
export function useNavbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { cartItems } = useCart();
  const { setShowSignup, setShowRegister, setPostLoginRedirect } =
    useAuthModal();

  // Nombre total d'articles dans le panier
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  // État du menu mobile burger
  const [menuOpen, setMenuOpen] = useState(false);

  // Déconnexion
  const handleLogout = useCallback(() => {
    if (window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
      logout();
      setMenuOpen(false);
      toast.info("Déconnexion réussie 👋", { icon: "👋" });
    }
  }, [logout]);

  // Ouvre la modal de connexion
  const handleLoginClick = useCallback(
    (e) => {
      e.preventDefault();
      setPostLoginRedirect(null);
      setShowSignup(true);
      setMenuOpen(false);
    },
    [setPostLoginRedirect, setShowSignup]
  );

  // Ouvre la modal d'inscription
  const handleRegisterClick = useCallback(
    (e) => {
      e.preventDefault();
      setPostLoginRedirect(null);
      setShowRegister(true);
      setMenuOpen(false);
    },
    [setPostLoginRedirect, setShowRegister]
  );

  return {
    isAuthenticated,
    isAdmin,
    totalItems,
    menuOpen,
    setMenuOpen,
    handleLogout,
    handleLoginClick,
    handleRegisterClick,
  };
}
