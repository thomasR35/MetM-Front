// src/hooks/useUserManagement.js
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

  const addUser = useCallback(async (newUser) => {
    const created = await createUser(newUser);
    setUsers((prev) => [...prev, created]);
    return created;
  }, []);

  const editUser = useCallback(async (id, updatedData) => {
    const updated = await updateUser(id, updatedData);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updated } : u))
    );
    return updated;
  }, []);

  const removeUser = useCallback(async (id) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

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
