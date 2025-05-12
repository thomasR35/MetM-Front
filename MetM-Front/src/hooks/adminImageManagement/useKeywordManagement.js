import { useState, useEffect, useCallback } from "react";
import {
  getKeywords,
  createKeyword,
  deleteKeyword,
} from "@/services/admin/keywordService";
import { getStoredUser } from "@/services/userService/userService";

export function useKeywordManagement() {
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadKeywords = useCallback(async () => {
    setLoading(true);
    try {
      const kws = await getKeywords();
      setKeywords(kws);
    } catch (err) {
      console.error("❌ Erreur de chargement des mots-clé :", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadKeywords();
  }, [loadKeywords]);

  const addKeyword = useCallback(async (name) => {
    if (!name.trim()) return;
    const user = getStoredUser();
    const newKw = await createKeyword({
      name,
      created_by: user?.id || "1",
    });
    setKeywords((prev) => [...prev, newKw]);
  }, []);

  const removeKeyword = useCallback(async (id) => {
    await deleteKeyword(id);
    setKeywords((prev) => prev.filter((kw) => kw.id !== id));
  }, []);

  return {
    keywords,
    loading,
    error,
    loadKeywords,
    addKeyword,
    removeKeyword,
  };
}
