import { TextOverlay } from "../text/TextOverlay";

/**
 * Génère une image composite (crop + texte) et retourne un dataURL.
 */
export class CompositeImage {
  /**
   * @param {string} productImageUrl    URL de la mockup (t-shirt, mug…)
   * @param {{dataUrl:string,width:number,height:number}} croppedData
   * @param {string} customText
   * @param {object} textOptions
   * @param {{x:number,y:number,width:number,height:number}} cropArea
   * @returns {Promise<{dataUrl:string,width:number,height:number}>}
   */
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
    // Ici on centre ; si tu veux coller exactement à cropArea.x/y, remplace dx/dy
    const cw = croppedData.width;
    const ch = croppedData.height;
    const dx = (canvas.width - cw) / 2;
    const dy = (canvas.height - ch) / 2;
    ctx.drawImage(user, dx, dy, cw, ch);

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
