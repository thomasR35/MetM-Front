// src/services/composite/CompositeImage.js
// ========================
import { TextOverlay } from "../text/TextOverlay";

export class CompositeImage {
  static async create({
    productImageUrl,
    croppedData,
    customText,
    textOptions,
    cropArea,
  }) {
    // 1) charger base + crop en parallèle
    const [base, user] = await Promise.all([
      CompositeImage.loadImage(productImageUrl),
      CompositeImage.loadImage(croppedData.dataUrl),
    ]);

    // 2) préparer le canvas de la taille de la mockup
    const canvas = document.createElement("canvas");
    canvas.width = base.width;
    canvas.height = base.height;
    const ctx = canvas.getContext("2d");

    // 3) dessiner la mockup
    ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

    // 4) dessiner le crop centré ou selon cropArea
    // On récupère tes valeurs de cropArea (fallback au centre si jamais manquant)
    const cw = croppedData.width;
    const ch = croppedData.height;
    let dx, dy, dw, dh;
    if (
      cropArea &&
      typeof cropArea.width === "number" &&
      typeof cropArea.height === "number"
    ) {
      dx = cropArea.x ?? 0;
      dy = cropArea.y ?? 0;
      dw = cropArea.width;
      dh = cropArea.height;
    } else {
      // fallback centré
      dx = (canvas.width - cw) / 2;
      dy = (canvas.height - ch) / 2;
      dw = cw;
      dh = ch;
    }
    ctx.drawImage(user, dx, dy, dw, dh);

    // 5) dessiner le texte par-dessus
    TextOverlay.draw(ctx, customText, textOptions);

    // 6) renvoyer le dataURL + taille du crop final (texte inclus)
    return {
      dataUrl: canvas.toDataURL("image/png"),
      width: canvas.width,
      height: canvas.height,
    };
  }

  static loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }
}
