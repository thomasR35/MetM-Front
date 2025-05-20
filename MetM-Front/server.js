// server.js
import express from "express";
import compression from "compression";
import path from "path";
import { fileURLToPath } from "url";

// Pour __dirname en ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// 1️⃣ Compression à la volée (gzip/brotli)
app.use(compression());

// 2️⃣ En-têtes de sécurité
app.use((req, res, next) => {
  // HSTS
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  // CSP (ajout de data: sur font-src pour tes fontes en base64)
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "script-src 'self'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data:; " +
      "frame-ancestors 'none'; " +
      "base-uri 'self'; " +
      "form-action 'self';"
  );
  // Isolation d'origine
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  // Clickjacking
  res.setHeader("X-Frame-Options", "DENY");
  next();
});

// 3️⃣ Service statique de tout le build (dist/)
app.use(
  express.static(path.join(__dirname, "dist"), {
    maxAge: "1y",
    immutable: true,
  })
);

// 4️⃣ Fallback pour une SPA : renvoie index.html sur toutes les autres routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// 5️⃣ Démarrage du serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(
    `🚀 Serveur prod local compressé et sécurisé sur http://localhost:${PORT}`
  );
});
