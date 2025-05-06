// src/services/cropping/Cropper.js
// ========================
import { CropParams } from "./CropParams";
import { clipStrategies } from "./Clips";

export class Cropper {
  /**
   * @param {HTMLImageElement} imgEl  – l'<img> de la modale
   * @param {DOMRect}         maskRect– getBoundingClientRect() du cadre
   * @param {"square"|"circle"|…} shape– nom de la stratégie
   */
  constructor(imgEl, maskRect, shape = "square") {
    this.imgEl = imgEl;
    this.maskRect = maskRect;
    this.shape = shape;
  }

  crop() {
    // on récupère la position et taille affichée
    const imgRect = this.imgEl.getBoundingClientRect();
    // on calcule les params
    const params = new CropParams(imgRect, this.maskRect, {
      width: this.imgEl.naturalWidth,
      height: this.imgEl.naturalHeight,
    });

    // canvas de destination
    const canvas = document.createElement("canvas");
    canvas.width = params.width;
    canvas.height = params.height;
    const ctx = canvas.getContext("2d");

    // clip selon stratégie
    const strategy = clipStrategies[this.shape] || clipStrategies.square;
    ctx.save();
    strategy.clip(ctx, params.width, params.height);

    // dessin de la portion extraite
    ctx.drawImage(
      this.imgEl,
      params.sx,
      params.sy,
      params.sw,
      params.sh,
      0,
      0,
      params.width,
      params.height
    );
    ctx.restore();

    return {
      dataUrl: canvas.toDataURL("image/png"),
      width: params.width,
      height: params.height,
    };
  }
}
