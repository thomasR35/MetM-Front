// src/hooks/adminDashboardPage/useAdminUser.js
//=====================================
import { useState, useEffect } from "react";

/**
 * Lit l'objet user stocké par useAdminLogin sous la clé "user".
 * Le back retourne { id, name, email, role } — on normalise
 * vers { username } pour l'affichage.
 */
export function useAdminUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      // Le back peut renvoyer `name` ou `username` selon la version
      setUser({
        ...parsed,
        username: parsed.username || parsed.name || "Admin",
      });
    } catch {
      setUser(null);
    }
  }, []);

  return user;
}
