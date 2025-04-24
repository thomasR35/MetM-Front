// calcule les paramètres de découpe en pixel natifs
export class CropParams {
  constructor(imgRect, maskRect, imgNaturalSize) {
    this.imgRect = imgRect;
    this.maskRect = maskRect;
    this.naturalWidth = imgNaturalSize.width;
    this.naturalHeight = imgNaturalSize.height;
  }

  // ratio CSS → natif
  get ratioX() {
    return this.naturalWidth / this.imgRect.width;
  }
  get ratioY() {
    return this.naturalHeight / this.imgRect.height;
  }

  // zone source dans l'image natif
  get sx() {
    return (this.maskRect.left - this.imgRect.left) * this.ratioX;
  }
  get sy() {
    return (this.maskRect.top - this.imgRect.top) * this.ratioY;
  }
  get sw() {
    return this.maskRect.width * this.ratioX;
  }
  get sh() {
    return this.maskRect.height * this.ratioY;
  }

  // taille du crop final
  get width() {
    return this.maskRect.width;
  }
  get height() {
    return this.maskRect.height;
  }
}
