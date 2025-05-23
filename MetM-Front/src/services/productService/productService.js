// src/services/productService.js
import mug1 from "@/assets/images/mug.webp";
import mug2 from "@/assets/images/mug-noir.webp";
import tshirt1 from "@/assets/images/tshirt-homme-FFF.webp";
import tshirt2 from "@/assets/images/tshirt-homme-000.webp";
import tshirt3 from "@/assets/images/tshirt-homme-A09D98.webp";
import tshirt4 from "@/assets/images/tshirt-femme-FFF.webp";
import tshirt5 from "@/assets/images/tshirt-femme-000.webp";
import tshirt6 from "@/assets/images/tshirt-femme-A09D98.webp";
import pins from "@/assets/images/pins.webp";

export const productData = {
  mug: { name: "Mug", price: 14.99, images: [mug1, mug2] },
  tshirt: {
    name: "T-Shirt",
    price: 19.99,
    images: [tshirt1, tshirt2, tshirt3, tshirt4, tshirt5, tshirt6],
  },
  pins: { name: "Pin’s", price: 4.99, images: [pins] },
};

export const cropZones = {
  mug: { x: 250, y: 320, width: 300, height: 300 },
  tshirt: { x: 320, y: 220, width: 350, height: 350 },
  pins: { x: 141, y: 134, width: 470, height: 470 },
};
