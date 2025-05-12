// src/components/PageMeta.jsx
// ========================
import React from "react";
import { Helmet } from "react-helmet";
import { usePageMeta } from "@/hooks/metaPage/usePageMeta";

export default function PageMeta() {
  const meta = usePageMeta();
  if (!meta) return null;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.canonical && <link rel="canonical" href={meta.canonical} />}
      {meta.image && <meta property="og:image" content={meta.image} />}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta
        property="og:url"
        content={meta.canonical || window.location.href}
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {meta.image && <meta name="twitter:image" content={meta.image} />}
    </Helmet>
  );
}
