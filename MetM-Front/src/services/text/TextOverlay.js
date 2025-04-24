export class TextOverlay {
  static draw(ctx, text, { fontFamily, fontSize, color, position }) {
    if (!text) return;
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const x = w * (position.x ?? 0.5);
    const y = h * (position.y ?? 0.9);
    ctx.fillText(text, x, y);
  }
}
