// src/services/cropping/Clips.js
// ========================
export const clipStrategies = {
  square: {
    clip(ctx, w, h) {
      ctx.beginPath();
      ctx.rect(0, 0, w, h);
      ctx.clip();
    },
  },
  circle: {
    clip(ctx, w, h) {
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, w / 2, 0, Math.PI * 2);
      ctx.clip();
    },
  },
  // exemple futur : heart, triangle, star…
};
