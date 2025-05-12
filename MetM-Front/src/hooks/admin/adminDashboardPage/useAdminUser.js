// src/hooks/adminDashboardPage/useAdminUser.js
//=====================================
import { useState, useEffect } from "react";
import { getStoredUser } from "@/services/userService/userService";

/**
 * Expose l'objet user (ou null) depuis le localStorage, et rafraîchit au montage.
 */
export function useAdminUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = getStoredUser();
    setUser(u);
  }, []);

  return user;
}
