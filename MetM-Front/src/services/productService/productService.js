// src/services/productService.js
import mug1 from "@/assets/images/mug1.jpg";
import mug2 from "@/assets/images/mug2.jpg";
import mug3 from "@/assets/images/mug3.jpg";
import tshirt from "@/assets/images/tshirt.jpg";
import pins1 from "@/assets/images/pins1.jpg";
import pins2 from "@/assets/images/pins2.jpg";
import pins3 from "@/assets/images/pins3.jpg";

export const productData = {
  mug: { name: "Mug", price: 14.99, images: [mug1, mug2, mug3] },
  tshirt: { name: "T-Shirt", price: 19.99, images: [tshirt] },
  pins: { name: "Pin’s", price: 9.99, images: [pins1, pins2, pins3] },
};

export const cropZones = {
  mug: [
    { width: 260, height: 220 },
    { width: 280, height: 240 },
    { width: 240, height: 200 },
  ],
  tshirt: [{ width: 260, height: 300 }],
  pins: [
    { width: 100, height: 100 },
    { width: 110, height: 110 },
    { width: 90, height: 90 },
  ],
};
