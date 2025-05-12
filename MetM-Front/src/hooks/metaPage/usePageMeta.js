// src/hooks/usePageMeta.js
import { useLocation, useParams } from "react-router-dom";
import { matchPath } from "react-router";
import { metaConfig } from "@/services//metaPageConfig/metaConfig";

/**
 * Renvoie l'objet meta correspondant à la route actuelle,
 * ou null si aucune config ne matche.
 */
export function usePageMeta() {
  const { pathname } = useLocation();
  const params = useParams();

  // On cherche la 1ère config dont le path matche le pathname
  const conf = metaConfig.find((cfg) =>
    matchPath({ path: cfg.path, end: true }, pathname)
  );
  if (!conf) return null;

  // Si c'est dynamique, on appelle getMeta(params), sinon on prend meta
  return conf.getMeta ? conf.getMeta(params) : conf.meta;
}
