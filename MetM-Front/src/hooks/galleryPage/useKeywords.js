// src/hooks/galleryPage/useKeywords.js
//=====================================
import { useState, useEffect } from "react";
import { fetchKeywords } from "@/services/galleryService/galleryService";

export function useKeywords() {
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const kw = await fetchKeywords();
        setKeywords(kw);
      } catch (err) {
        console.error("Erreur mots‐clés :", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { keywords, loading, error };
}
