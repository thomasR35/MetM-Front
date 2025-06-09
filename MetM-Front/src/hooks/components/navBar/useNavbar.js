// src/hooks/navBar/useNavbar.js
//=========================================
import { useState, useCallback, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { useConfirm } from "@/hooks/components/confirmDialog/useConfirm";
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
  const { confirm, ConfirmUI } = useConfirm();

  // Nombre total d'articles dans le panier
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  // État du menu mobile burger
  const [menuOpen, setMenuOpen] = useState(false);

  // Déconnexion
  const handleLogout = useCallback(async () => {
    try {
      // Affiche la modale et attend que l'utilisateur confirme
      await confirm({
        title: "Déconnexion",
        message: "Voulez-vous vraiment vous déconnecter ?",
        confirmLabel: "Se déconnecter",
        cancelLabel: "Annuler",
      });
      // Si on arrive ici, l'utilisateur a cliqué sur “Confirmer”
      logout();
      setMenuOpen(false);
      toast.info("Déconnexion réussie 👋", { icon: "👋" });
    } catch {
      // L'utilisateur a cliqué sur “Annuler” ou fermé la modale : on ne fait rien
    }
  }, [confirm, logout]);

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
    ConfirmUI,
  };
}
