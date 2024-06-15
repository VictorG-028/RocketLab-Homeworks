import { ProductDto } from "@/dto/ProductDto";

function generateRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1));
}

function getRandomElement<T>(list: T[]): T {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

const imageBasePath = "src/assets/products/gaming_mouse/";
const names = ["Logitech G502 X Plus Lightspeed Wireless Optical Mouse", "Razer Viper V3", "Redragon M612 Predator RGB", "Razer DeathAdder Essential Gaming Mouse", "Logitech G305 LIGHTSPEED", "Razer Viper V3 Pro", "TMKB Falcon M1SE Ultralight Honeycomb", "SM600 White Wireless Gaming Mouse", "Logitech G Pro X SUPERLIGHT wireless", "Logitech G PRO X SUPERLIGHT 2 LIGHTSPEED", "SM600 White Wireless Gaming Mouse", "UtechSmart Venus Pro RGB Wireless MMO Gaming Mouse", "Corsair SCIMITAR RGB ELITE Gaming Mouse For MOBA, MMO", "BENGOO Gaming Mouse Wired, Ergonomic Gamer Laptop PC USB Optical Computer Mice with RGB Backlit", "TMKB Falcon M1SB"];
const descriptions = [
  "Dominate the battlefield with pinpoint precision and lightning-fast responsiveness. The G502 X Plus boasts next-gen HERO 25K sensor for unmatched accuracy and customizable weight for the perfect fit. Unleash ultimate control and conquer any challenge.",
  "Strike fear into your opponents with the featherweight Razer Viper V3. This ultralight champion boasts Razer Optical Switches for near-instantaneous clicks and Razer Chroma RGB for personalized flair. Become a blur of deadly precision.",
  "Budget slayer alert! The M612 Predator packs a punch with programmable buttons, customizable RGB lighting, and a comfortable ergonomic design. Unleash your inner gamer without breaking the bank.",
  "The legend returns. The Razer DeathAdder Essential retains its iconic comfort and performance, making it a timeless classic for all grip styles. Experience pure, unadulterated gaming excellence.",
  "Wireless freedom meets legendary performance. The G305 LIGHTSPEED delivers exceptional responsiveness and a lightweight design, perfect for gamers on the go. Conquer the competition with lag-free wireless technology.",
  "Cut the cord, not your performance. The Viper V3 Pro boasts the world's fastest wireless charging and cutting-edge optical switches for unmatched speed and control. Experience the future of wireless gaming.",
  "Lightweight. Agile. Deadly. The Falcon M1SE features a revolutionary honeycomb design for featherweight maneuverability and top-tier sensor performance. Soar above the competition with effortless precision.",
  "Clean aesthetics meet impressive performance. The SM600 White offers a sleek design, comfortable grip, and responsive buttons, making it a perfect choice for casual gamers and productivity enthusiasts alike.",
  "Unleash the champion within. The G Pro X SUPERLIGHT prioritizes minimal weight for maximum speed. Experience unparalleled comfort and control with a customizable fit and innovative materials.",
  "The evolution of esports dominance. The G Pro X SUPERLIGHT 2 builds upon its predecessor with even lighter weight and improved click responsiveness. Push your limits and redefine victory.",
  "Silence the competition with whisper-quiet clicks. The SM600 White offers a comfortable, silent experience perfect for late-night gaming sessions without disturbing your family or roommates.",
  "Command your MMO domain with ease. The Venus Pro boasts an ergonomic design with programmable buttons specifically tailored for MMO games. Take control of your destiny with customizable lighting and powerful performance.",
  "Conquer the battlefield with unmatched precision. The SCIMITAR RGB ELITE features a unique macro side button grid and comfortable design, offering ultimate control for MOBA and MMO domination. Annihilate your foes with ease.",
  "Level up your game without breaking the bank. The BENGOO Gaming Mouse delivers a comfortable ergonomic design, vibrant RGB lighting, and precise sensor performance for aspiring gamers. Take your first step on the path to victory!",
  "Unleash your inner sniper. The Falcon M1SB boasts a high-precision sensor and lightweight design, perfect for games demanding pinpoint accuracy. Take down your enemies with laser-like focus."
];
const brands = [
  "Logitech", "Razer", "Redragon", "Razer", "Logitech", "Razer", "TMKB", "SM", "Logitech", "Logitech", "SM", "UtechSmart", "Corsair", "BENGOO", "TMKB"
];
const colors = ["Preto", "Preto", "Preto", "Preto", "Preto", "Preto", "Branco", "Branco", "Preto", "Preto", "Branco", "Preto", "Preto", "Preto", "Preto"
];
const models = [
  "G502 X Plus Lightspeed", "Viper V3", "M612 Predator RGB", "DeathAdder Essential", "G305 LIGHTSPEED", "Viper V3 Pro", "Falcon M1SE", "SM600", "G Pro X SUPERLIGHT", "G PRO X SUPERLIGHT 2", "SM600", "Venus Pro RGB", "SCIMITAR RGB ELITE", "Gaming Mouse", "Falcon M1SB"
];

const connecs = [
  "Sem fio", "Sem fio", "Com fio", "Com fio", "Sem fio", "Sem fio", "Com fio", "Sem fio", "Sem fio", "Sem fio", "Sem fio", "Sem fio", "Com fio", "Com fio", "Com fio"
];
const prices = [400, 275, 350, 325, 300];
const cents = [0, 50, 99];

const example: ProductDto = {
  id: 0,
  imageUrl: "https://fakeimg.pl/256x512/767171/",
  name: "nome",
  price: 10.99,
  currency: "R$",
  description: "nome do produto aqui - descrição looooooooooooooonga aqui lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
  readyToShipToday: true,
  brand: "asus",
  model: "ABC",
  color: "Preto",
  connectivity: "com fio",
  quantity: 0,
  isRemoved: false
}

export const products: ProductDto[] = Array(15).fill(null).map((_, i) => ({
  id: i,
  imageUrl: `${imageBasePath}product_${i}.jpg`,
  name: names[i],
  price: parseFloat(`${getRandomElement(prices)}.${getRandomElement(cents)}`),
  currency: "R$",
  description: `${names[i]}` + " - " + descriptions[i], // " - descrição looooooooooooooonga aqui " + "lorem ipsum ".repeat(generateRandomInt(7, 50)),
  readyToShipToday: getRandomElement([false, true]),
  brand: brands[i],
  color: colors[i],
  model: models[i],
  connectivity: connecs[i],
  quantity: 10,
  isRemoved: false
}));
