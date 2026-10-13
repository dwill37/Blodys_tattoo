import type { StaticImageData } from "next/image";

import img1 from "@/image/image_1.jpg";
import img2 from "@/image/image_2.jpg";
import img3 from "@/image/image_3.jpg";
import img4 from "@/image/image_4.jpg";
import img5 from "@/image/image_5.jpg";
import img6 from "@/image/image_6.jpg";
import img7 from "@/image/image_7.jpg";
import img8 from "@/image/image_8.jpg";
import img9 from "@/image/image_9.jpg";
import img10 from "@/image/image_10.jpg";
import img11 from "@/image/image_11.jpg";
import img12 from "@/image/image_12.jpg";
import img13 from "@/image/image_13.jpg";

export type Photo = { id: string; src: StaticImageData; alt: string };

/*
 * Not used on purpose:
 * - image_14.png is the same skull-and-crossbones piece as image_3.jpg.
 * - image_15.jpg is a piercing price flyer (Spanish), not tattoo work.
 */
export const photos = {
  rune: { id: "rune", src: img1, alt: "Small solid blackwork rune symbol tattoo centered on the upper back" },
  star: { id: "star", src: img2, alt: "Red dotwork star tattoo with stippled shading on the shoulder blade" },
  skull: { id: "skull", src: img3, alt: "Black skull and crossbones tattoo with an outlined star on the forearm" },
  kanji: { id: "kanji", src: img4, alt: "Bold black kanji tattoo framed by red bat silhouettes on the back of the hand" },
  lions: {
    id: "lions",
    src: img5,
    alt: "Black and grey calf tattoo of a crowned lion and lioness with wings over a football, above the script 'Un amor que pocos entienden'",
  },
  bat: { id: "bat", src: img6, alt: "Fine linework tattoo of a bat wearing sunglasses and smoking, on the leg" },
  hands: { id: "hands", src: img7, alt: "Tattoo artist in black gloves inking fresh script lettering on a client's forearm" },
  faith: { id: "faith", src: img8, alt: "Black and grey lettering tattoo on the forearm reading 'Nunca pierdas la fe'" },
  skulls: { id: "skulls", src: img9, alt: "Blackwork chain of horned animal skulls running down the forearm" },
  serpent: {
    id: "serpent",
    src: img10,
    alt: "Black and grey Aztec feathered serpent head tattoo with shaded plumes",
  },
  badboy: { id: "badboy", src: img11, alt: "Hand-drawn outline lettering tattoo reading 'Bad Boy' along the inner forearm" },
  kiss: { id: "kiss", src: img12, alt: "Small red ink kiss mark tattoo with negative-space detail on the hip" },
  hearts: { id: "hearts", src: img13, alt: "Matching barbed-wire heart outline tattoos on the back of both thighs" },
} satisfies Record<string, Photo>;

/** Portfolio order: alternates color and black and grey, small and large. */
export const gallery: Photo[] = [
  photos.kanji,
  photos.faith,
  photos.star,
  photos.serpent,
  photos.lions,
  photos.rune,
  photos.hearts,
  photos.bat,
  photos.skulls,
  photos.kiss,
  photos.badboy,
  photos.skull,
];
