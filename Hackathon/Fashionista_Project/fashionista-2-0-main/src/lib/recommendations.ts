import { Product } from "../data/products";

interface OutfitItem {
  name: string;
  brand: string;
  category: string;
  color: string;
  price: number;
  image: string;
}

export interface OutfitRecommendation {
  title: string;
  tip: string;
  items: OutfitItem[];
  accessories: OutfitItem[];
}

const OUTFIT_COMBOS: Record<string, OutfitItem[][]> = {
  casual: [
    [
      { name: "Classic Cotton Tee", brand: "H&M", category: "Top", color: "White", price: 15, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop" },
      { name: "Slim Fit Jeans", brand: "Levi's", category: "Bottom", color: "Blue", price: 60, image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400&h=500&fit=crop" },
      { name: "Classic White Sneakers", brand: "Adidas", category: "Shoes", color: "White", price: 85, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop" },
    ],
    [
      { name: "Striped Polo Shirt", brand: "Tommy Hilfiger", category: "Top", color: "Navy", price: 50, image: "https://images.unsplash.com/photo-1625910513413-5fc421e0fd6d?w=400&h=500&fit=crop" },
      { name: "Tailored Chinos", brand: "H&M", category: "Bottom", color: "Beige", price: 25, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop" },
      { name: "Classic White Sneakers", brand: "Adidas", category: "Shoes", color: "White", price: 85, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop" },
    ],
    [
      { name: "Oversized Graphic Hoodie", brand: "Nike", category: "Top", color: "Black", price: 65, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop" },
      { name: "Track Pants", brand: "Adidas", category: "Bottom", color: "Black", price: 45, image: "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=400&h=500&fit=crop" },
      { name: "Air Max Running Shoes", brand: "Nike", category: "Shoes", color: "Black", price: 120, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop" },
    ],
  ],
  formal: [
    [
      { name: "Silk Blend Blouse", brand: "Zara", category: "Top", color: "White", price: 55, image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=500&fit=crop" },
      { name: "Wide Leg Trousers", brand: "Zara", category: "Bottom", color: "Black", price: 50, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop" },
      { name: "Oxford Dress Shoes", brand: "Calvin Klein", category: "Shoes", color: "Black", price: 160, image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=500&fit=crop" },
    ],
    [
      { name: "Slim Fit Suit", brand: "H&M", category: "Suit", color: "Navy", price: 150, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop" },
      { name: "Oxford Dress Shoes", brand: "Calvin Klein", category: "Shoes", color: "Black", price: 160, image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=500&fit=crop" },
    ],
    [
      { name: "Luxury Cashmere Sweater", brand: "Ralph Lauren", category: "Top", color: "Navy", price: 195, image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a0b?w=400&h=500&fit=crop" },
      { name: "Tailored Chinos", brand: "H&M", category: "Bottom", color: "Beige", price: 25, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop" },
      { name: "Designer Loafers", brand: "Louis Vuitton", category: "Shoes", color: "Brown", price: 590, image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=500&fit=crop" },
    ],
  ],
  party: [
    [
      { name: "Little Black Dress", brand: "Zara", category: "Dress", color: "Black", price: 70, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop" },
      { name: "Designer Loafers", brand: "Louis Vuitton", category: "Shoes", color: "Black", price: 590, image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=500&fit=crop" },
    ],
    [
      { name: "Designer Evening Gown", brand: "Gucci", category: "Dress", color: "Red", price: 450, image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=500&fit=crop" },
      { name: "Oxford Dress Shoes", brand: "Calvin Klein", category: "Shoes", color: "Black", price: 160, image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=500&fit=crop" },
    ],
    [
      { name: "Leather Biker Jacket", brand: "Gucci", category: "Outerwear", color: "Black", price: 350, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop" },
      { name: "Slim Fit Jeans", brand: "Levi's", category: "Bottom", color: "Black", price: 60, image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400&h=500&fit=crop" },
      { name: "Air Max Running Shoes", brand: "Nike", category: "Shoes", color: "Black", price: 120, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop" },
    ],
  ],
  college: [
    [
      { name: "Oversized Graphic Hoodie", brand: "Nike", category: "Top", color: "Grey", price: 65, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop" },
      { name: "Slim Fit Jeans", brand: "Levi's", category: "Bottom", color: "Blue", price: 60, image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400&h=500&fit=crop" },
      { name: "Classic White Sneakers", brand: "Adidas", category: "Shoes", color: "White", price: 85, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop" },
    ],
    [
      { name: "Logo Performance Tee", brand: "Adidas", category: "Top", color: "Black", price: 30, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop" },
      { name: "Tailored Chinos", brand: "H&M", category: "Bottom", color: "Navy", price: 25, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop" },
      { name: "Air Max Running Shoes", brand: "Nike", category: "Shoes", color: "Red", price: 120, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop" },
    ],
    [
      { name: "Classic Denim Jacket", brand: "Levi's", category: "Outerwear", color: "Blue", price: 80, image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=500&fit=crop" },
      { name: "Classic Cotton Tee", brand: "H&M", category: "Top", color: "White", price: 15, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop" },
      { name: "Slim Fit Jeans", brand: "Levi's", category: "Bottom", color: "Black", price: 60, image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400&h=500&fit=crop" },
      { name: "Classic White Sneakers", brand: "Adidas", category: "Shoes", color: "White", price: 85, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop" },
    ],
  ],
  sports: [
    [
      { name: "Logo Performance Tee", brand: "Adidas", category: "Top", color: "White", price: 30, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop" },
      { name: "Track Pants", brand: "Adidas", category: "Bottom", color: "Black", price: 45, image: "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=400&h=500&fit=crop" },
      { name: "Air Max Running Shoes", brand: "Nike", category: "Shoes", color: "Black", price: 120, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop" },
    ],
    [
      { name: "Windbreaker Jacket", brand: "Nike", category: "Outerwear", color: "Black", price: 75, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop" },
      { name: "Track Pants", brand: "Adidas", category: "Bottom", color: "Navy", price: 45, image: "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=400&h=500&fit=crop" },
      { name: "Air Max Running Shoes", brand: "Nike", category: "Shoes", color: "Blue", price: 120, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop" },
    ],
  ],
  business: [
    [
      { name: "Slim Fit Suit", brand: "H&M", category: "Suit", color: "Navy", price: 150, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop" },
      { name: "Oxford Dress Shoes", brand: "Calvin Klein", category: "Shoes", color: "Black", price: 160, image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=500&fit=crop" },
    ],
    [
      { name: "Luxury Cashmere Sweater", brand: "Ralph Lauren", category: "Top", color: "Grey", price: 195, image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a0b?w=400&h=500&fit=crop" },
      { name: "Wide Leg Trousers", brand: "Zara", category: "Bottom", color: "Navy", price: 50, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop" },
      { name: "Designer Loafers", brand: "Louis Vuitton", category: "Shoes", color: "Brown", price: 590, image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=500&fit=crop" },
    ],
  ],
  "date night": [
    [
      { name: "Little Black Dress", brand: "Zara", category: "Dress", color: "Black", price: 70, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop" },
      { name: "Oxford Dress Shoes", brand: "Calvin Klein", category: "Shoes", color: "Black", price: 160, image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=500&fit=crop" },
    ],
    [
      { name: "Silk Blend Blouse", brand: "Zara", category: "Top", color: "Pink", price: 55, image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=500&fit=crop" },
      { name: "Wide Leg Trousers", brand: "Zara", category: "Bottom", color: "Black", price: 50, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop" },
      { name: "Designer Loafers", brand: "Louis Vuitton", category: "Shoes", color: "Black", price: 590, image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=500&fit=crop" },
    ],
  ],
  wedding: [
    [
      { name: "Italian Wool Suit", brand: "Gucci", category: "Suit", color: "Navy", price: 1200, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=500&fit=crop" },
      { name: "Oxford Dress Shoes", brand: "Calvin Klein", category: "Shoes", color: "Black", price: 160, image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=500&fit=crop" },
    ],
    [
      { name: "Designer Evening Gown", brand: "Gucci", category: "Dress", color: "Navy", price: 450, image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=500&fit=crop" },
      { name: "Designer Loafers", brand: "Louis Vuitton", category: "Shoes", color: "Black", price: 590, image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=500&fit=crop" },
    ],
  ],
  beach: [
    [
      { name: "Classic Cotton Tee", brand: "H&M", category: "Top", color: "White", price: 15, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop" },
      { name: "Tailored Chinos", brand: "H&M", category: "Bottom", color: "Beige", price: 25, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop" },
      { name: "Classic White Sneakers", brand: "Adidas", category: "Shoes", color: "White", price: 85, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop" },
    ],
  ],
};

const ACCESSORY_OPTIONS: OutfitItem[] = [
  { name: "Analog Watch", brand: "Fastrack", category: "Watch", color: "Black", price: 35, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=500&fit=crop" },
  { name: "Aviator Sunglasses", brand: "Ray-Ban", category: "Sunglasses", color: "Gold", price: 150, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop" },
  { name: "Leather Belt", brand: "Tommy Hilfiger", category: "Belt", color: "Brown", price: 45, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop" },
  { name: "Sports Cap", brand: "Nike", category: "Cap", color: "Black", price: 25, image: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=400&h=500&fit=crop" },
  { name: "Crossbody Bag", brand: "Puma", category: "Bag", color: "Black", price: 30, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop" },
  { name: "Gold Chain Necklace", brand: "Calvin Klein", category: "Jewelry", color: "Gold", price: 75, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop" },
  { name: "Designer Tote Bag", brand: "Louis Vuitton", category: "Bag", color: "Brown", price: 1500, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop" },
];

const TIPS: Record<string, string[]> = {
  casual: [
    "Keep it simple — neutral tones with one statement piece.",
    "Layer a denim jacket for effortless street style.",
    "White sneakers are your best friend for casual looks.",
  ],
  formal: [
    "A well-fitted suit speaks louder than words.",
    "Stick to dark tones — navy and charcoal are timeless.",
    "Polished shoes elevate any formal outfit instantly.",
  ],
  party: [
    "Go bold — a statement piece makes all the difference.",
    "Metallic accents add glamour without overdoing it.",
    "Confidence is the best accessory. Own your look!",
  ],
  college: [
    "Mix comfort with style — hoodies + clean sneakers always work.",
    "Layer up for a put-together vibe without trying too hard.",
    "Denim jacket + basic tee = campus classic.",
  ],
  sports: [
    "Performance fabrics keep you cool and stylish.",
    "Match your sneakers to your outfit for a coordinated look.",
    "A good windbreaker is essential for outdoor workouts.",
  ],
  business: [
    "Invest in quality basics — they last longer and look sharper.",
    "A cashmere sweater adds sophistication to any business look.",
    "Loafers bridge the gap between formal and approachable.",
  ],
  "date night": [
    "Subtle elegance wins — less is more.",
    "A touch of fragrance completes the outfit.",
    "Wear something that makes YOU feel confident.",
  ],
  wedding: [
    "Invest in a quality suit — you'll wear it for years.",
    "Coordinate your accessories with the event's color scheme.",
    "When in doubt, go classic. Timelessness never fails.",
  ],
  beach: [
    "Light fabrics and neutral tones are perfect for the coast.",
    "Sunglasses are non-negotiable at the beach.",
    "Keep it breezy — linen and cotton are your best options.",
  ],
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateRecommendation(
  occasion: string,
  _gender: string,
  _bodyShape: string,
  _skinTone: string
): OutfitRecommendation {
  const key = occasion.toLowerCase();
  const combos = OUTFIT_COMBOS[key] || OUTFIT_COMBOS.casual;
  const randomCombo = combos[Math.floor(Math.random() * combos.length)];
  const tips = TIPS[key] || TIPS.casual;
  const tip = tips[Math.floor(Math.random() * tips.length)];

  const shuffledAccessories = shuffle(ACCESSORY_OPTIONS);
  const numAccessories = 2 + Math.floor(Math.random() * 2);
  const accessories = shuffledAccessories.slice(0, numAccessories);

  const occasionTitles: Record<string, string[]> = {
    casual: ["Effortless Street Style", "Laid-Back Vibes", "Weekend Ready"],
    formal: ["Refined Elegance", "Power Dressing", "Sharp & Sophisticated"],
    party: ["Night Out Glam", "Party Ready", "Bold & Beautiful"],
    college: ["Campus Cool", "Study in Style", "Class Act"],
    sports: ["Active & Sharp", "Game Day Ready", "Athletic Edge"],
    business: ["Boardroom Ready", "Executive Style", "Professional Poise"],
    "date night": ["Date Night Charm", "Romantic Edge", "Evening Elegance"],
    wedding: ["Wedding Guest Perfection", "Celebration Ready", "Grand Occasion"],
    beach: ["Coastal Breeze", "Beach Ready", "Sun & Style"],
  };

  const titles = occasionTitles[key] || occasionTitles.casual;
  const title = titles[Math.floor(Math.random() * titles.length)];

  return { title, tip, items: randomCombo, accessories };
}
