// src/services/text/TextOverlay.js
// ========================
// src/services/text/TextOverlay.js

export class TextOverlay {
  /**
   * Dessine un texte centré sur le canvas.
   * @param {CanvasRenderingContext2D} ctx     — contexte 2D du canvas
   * @param {string} text                     — texte à afficher
   * @param {object} [options]                — options de style
   * @param {string} [options.fontFamily]     — police (défaut "sans-serif")
   * @param {number} [options.fontSize]       — taille en px (défaut 24)
   * @param {string} [options.color]          — couleur (défaut "#000000")
   * @param {{ x: number, y: number }} [options.position]
   *                                          — position relative (défaut { x:0.5, y:0.9 })
   */
  static draw(ctx, text, options = {}) {
    if (!text) return;

    // Valeurs par défaut
    const {
      fontFamily = "sans-serif",
      fontSize = 24,
      color = "#000000",
      position = { x: 0.5, y: 0.9 },
    } = options;

    ctx.save();

    // Style du texte
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Calcul de la position
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const x = w * (position.x ?? 0.5);
    const y = h * (position.y ?? 0.9);

    ctx.fillText(text, x, y);
    ctx.restore();
  }
}
