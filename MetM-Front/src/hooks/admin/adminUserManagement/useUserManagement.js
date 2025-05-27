// src/hooks/adminUserManagement/useUserManagement.js
//=====================================
// src/hooks/adminUserManagement/useUserManagement.js
import { useState, useEffect, useCallback } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/services/admin/userService";

export function useUserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getUsers();
      setUsers(list);
      setError(null);
    } catch (err) {
      console.error("❌ Erreur de chargement des utilisateurs :", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const addUser = useCallback(
    async (newUser) => {
      setLoading(true);
      try {
        await createUser(newUser);
        await loadUsers(); // ← on recharge la liste complète
      } catch (err) {
        console.error("❌ Erreur de création :", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [loadUsers]
  );

  const editUser = useCallback(
    async (id, updatedData) => {
      setLoading(true);
      try {
        await updateUser(id, updatedData);
        await loadUsers();
      } catch (err) {
        console.error("❌ Erreur de modification :", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [loadUsers]
  );

  const removeUser = useCallback(
    async (id) => {
      setLoading(true);
      try {
        await deleteUser(id);
        await loadUsers();
      } catch (err) {
        console.error("❌ Erreur de suppression :", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [loadUsers]
  );

  return {
    users,
    loading,
    error,
    loadUsers,
    addUser,
    editUser,
    removeUser,
  };
}
