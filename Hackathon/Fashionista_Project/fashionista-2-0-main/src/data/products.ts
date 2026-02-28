export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  occasion: string[];
  budget: "low" | "medium" | "high";
  price: number; // USD
  colors: string[];
  sizes: string[];
  image: string;
  material: string;
  inStock: boolean;
  description: string;
}

const UNSPLASH = (q: string, i: number) =>
  `https://images.unsplash.com/photo-${q}?w=600&h=800&fit=crop&auto=format`;

export const BRANDS = [
  "H&M", "Westside", "Zara", "Louis Vuitton", "Nike", "Adidas",
  "Levi's", "Gucci", "Tommy Hilfiger", "Denim Co", "Fastrack",
  "Ray-Ban", "Puma", "Calvin Klein", "Ralph Lauren",
];

export const CATEGORIES = [
  "Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories", "Suits",
];

export const OCCASIONS = [
  "Casual", "Formal", "Party", "College", "Sports", "Business",
];

export const COLOR_OPTIONS = [
  "Black", "White", "Navy", "Red", "Blue", "Green", "Pink", "Beige", "Grey", "Brown", "Yellow", "Purple",
];

export const PRODUCTS: Product[] = [
  // Tops
  { id: "t1", name: "Classic Cotton Tee", brand: "H&M", category: "Tops", occasion: ["Casual", "College"], budget: "low", price: 15, colors: ["White", "Black", "Navy"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", material: "100% Cotton", inStock: true, description: "Essential everyday cotton t-shirt with a relaxed fit." },
  { id: "t2", name: "Silk Blend Blouse", brand: "Zara", category: "Tops", occasion: ["Formal", "Business", "Party"], budget: "medium", price: 55, colors: ["White", "Pink", "Beige"], sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop", material: "Silk Blend", inStock: true, description: "Elegant silk blend blouse perfect for office and evening wear." },
  { id: "t3", name: "Oversized Graphic Hoodie", brand: "Nike", category: "Tops", occasion: ["Casual", "College", "Sports"], budget: "medium", price: 65, colors: ["Black", "Grey", "Green"], sizes: ["S", "M", "L", "XL", "XXL"], image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", material: "Cotton Fleece", inStock: true, description: "Comfortable oversized hoodie with bold graphics." },
  { id: "t4", name: "Luxury Cashmere Sweater", brand: "Ralph Lauren", category: "Tops", occasion: ["Formal", "Business"], budget: "high", price: 195, colors: ["Navy", "Beige", "Grey"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a0b?w=600&h=800&fit=crop", material: "Pure Cashmere", inStock: true, description: "Premium cashmere sweater with refined details." },
  { id: "t5", name: "Striped Polo Shirt", brand: "Tommy Hilfiger", category: "Tops", occasion: ["Casual", "College", "Business"], budget: "medium", price: 50, colors: ["White", "Navy", "Red"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1625910513413-5fc421e0fd6d?w=600&h=800&fit=crop", material: "Pique Cotton", inStock: true, description: "Classic striped polo with signature branding." },
  { id: "t6", name: "Logo Performance Tee", brand: "Adidas", category: "Tops", occasion: ["Sports", "Casual"], budget: "low", price: 30, colors: ["Black", "White", "Blue"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=800&fit=crop", material: "Climacool", inStock: true, description: "Moisture-wicking performance tee for active lifestyles." },

  // Bottoms
  { id: "b1", name: "Slim Fit Jeans", brand: "Levi's", category: "Bottoms", occasion: ["Casual", "College"], budget: "medium", price: 60, colors: ["Blue", "Black", "Grey"], sizes: ["28", "30", "32", "34", "36"], image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=600&h=800&fit=crop", material: "Stretch Denim", inStock: true, description: "Iconic slim fit jeans with stretch comfort." },
  { id: "b2", name: "Tailored Chinos", brand: "H&M", category: "Bottoms", occasion: ["Casual", "Business", "Formal"], budget: "low", price: 25, colors: ["Beige", "Navy", "Black"], sizes: ["28", "30", "32", "34", "36"], image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop", material: "Cotton Twill", inStock: true, description: "Versatile tailored chinos for any occasion." },
  { id: "b3", name: "Wide Leg Trousers", brand: "Zara", category: "Bottoms", occasion: ["Formal", "Party", "Business"], budget: "medium", price: 50, colors: ["Black", "White", "Navy"], sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop", material: "Polyester Blend", inStock: true, description: "Flowing wide leg trousers with a modern silhouette." },
  { id: "b4", name: "Track Pants", brand: "Adidas", category: "Bottoms", occasion: ["Sports", "Casual"], budget: "medium", price: 45, colors: ["Black", "Navy", "Grey"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=600&h=800&fit=crop", material: "Recycled Polyester", inStock: true, description: "Classic 3-stripe track pants for sports and leisure." },

  // Dresses
  { id: "d1", name: "Floral Midi Dress", brand: "Westside", category: "Dresses", occasion: ["Casual", "Party"], budget: "medium", price: 45, colors: ["Pink", "Blue", "Green"], sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop", material: "Viscose", inStock: true, description: "Beautiful floral midi dress with flowing silhouette." },
  { id: "d2", name: "Little Black Dress", brand: "Zara", category: "Dresses", occasion: ["Party", "Formal"], budget: "medium", price: 70, colors: ["Black"], sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop", material: "Crepe", inStock: true, description: "Timeless LBD for cocktails and evenings." },
  { id: "d3", name: "Designer Evening Gown", brand: "Gucci", category: "Dresses", occasion: ["Party", "Formal"], budget: "high", price: 450, colors: ["Red", "Black", "Navy"], sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop", material: "Italian Silk", inStock: true, description: "Stunning designer gown for special occasions." },

  // Outerwear
  { id: "o1", name: "Classic Denim Jacket", brand: "Levi's", category: "Outerwear", occasion: ["Casual", "College"], budget: "medium", price: 80, colors: ["Blue", "Black"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&h=800&fit=crop", material: "Denim", inStock: true, description: "Iconic trucker jacket in premium denim." },
  { id: "o2", name: "Wool Overcoat", brand: "Calvin Klein", category: "Outerwear", occasion: ["Formal", "Business"], budget: "high", price: 250, colors: ["Black", "Grey", "Beige"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop", material: "Wool Blend", inStock: true, description: "Sophisticated wool overcoat for cold weather elegance." },
  { id: "o3", name: "Windbreaker Jacket", brand: "Nike", category: "Outerwear", occasion: ["Sports", "Casual"], budget: "medium", price: 75, colors: ["Black", "Green", "Blue"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop", material: "Nylon", inStock: true, description: "Lightweight windbreaker for outdoor activities." },
  { id: "o4", name: "Leather Biker Jacket", brand: "Gucci", category: "Outerwear", occasion: ["Party", "Casual"], budget: "high", price: 350, colors: ["Black", "Brown"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop", material: "Genuine Leather", inStock: true, description: "Premium leather jacket with bold hardware." },

  // Shoes
  { id: "s1", name: "Classic White Sneakers", brand: "Adidas", category: "Shoes", occasion: ["Casual", "College", "Sports"], budget: "medium", price: 85, colors: ["White", "Black"], sizes: ["7", "8", "9", "10", "11"], image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop", material: "Leather", inStock: true, description: "Clean minimal white sneakers for everyday." },
  { id: "s2", name: "Air Max Running Shoes", brand: "Nike", category: "Shoes", occasion: ["Sports", "Casual"], budget: "medium", price: 120, colors: ["Black", "Red", "Blue"], sizes: ["7", "8", "9", "10", "11"], image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop", material: "Mesh & Rubber", inStock: true, description: "Iconic air-cushioned running shoes." },
  { id: "s3", name: "Oxford Dress Shoes", brand: "Calvin Klein", category: "Shoes", occasion: ["Formal", "Business"], budget: "high", price: 160, colors: ["Black", "Brown"], sizes: ["7", "8", "9", "10", "11"], image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop", material: "Genuine Leather", inStock: true, description: "Refined Oxford shoes for formal occasions." },
  { id: "s4", name: "Designer Loafers", brand: "Louis Vuitton", category: "Shoes", occasion: ["Formal", "Party", "Business"], budget: "high", price: 590, colors: ["Black", "Brown"], sizes: ["7", "8", "9", "10", "11"], image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&h=800&fit=crop", material: "Italian Leather", inStock: true, description: "Luxurious designer loafers with signature details." },

  // Suits
  { id: "su1", name: "Slim Fit Suit", brand: "H&M", category: "Suits", occasion: ["Formal", "Business"], budget: "medium", price: 150, colors: ["Navy", "Black", "Grey"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop", material: "Polyester Blend", inStock: true, description: "Modern slim fit suit for office and events." },
  { id: "su2", name: "Italian Wool Suit", brand: "Gucci", category: "Suits", occasion: ["Formal", "Party", "Business"], budget: "high", price: 1200, colors: ["Navy", "Black"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop", material: "Italian Wool", inStock: true, description: "Impeccably crafted luxury suit in finest wool." },

  // Accessories
  { id: "a1", name: "Analog Watch", brand: "Fastrack", category: "Accessories", occasion: ["Casual", "College"], budget: "low", price: 35, colors: ["Black", "Brown", "Navy"], sizes: ["One Size"], image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=800&fit=crop", material: "Stainless Steel", inStock: true, description: "Sleek analog watch with leather strap." },
  { id: "a2", name: "Aviator Sunglasses", brand: "Ray-Ban", category: "Accessories", occasion: ["Casual", "Party"], budget: "medium", price: 150, colors: ["Black", "Gold", "Brown"], sizes: ["One Size"], image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=800&fit=crop", material: "Metal & Glass", inStock: true, description: "Classic aviator sunglasses with UV protection." },
  { id: "a3", name: "Leather Belt", brand: "Tommy Hilfiger", category: "Accessories", occasion: ["Casual", "Formal", "Business"], budget: "medium", price: 45, colors: ["Black", "Brown"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop", material: "Genuine Leather", inStock: true, description: "Classic leather belt with signature buckle." },
  { id: "a4", name: "Designer Tote Bag", brand: "Louis Vuitton", category: "Accessories", occasion: ["Formal", "Business", "Party"], budget: "high", price: 1500, colors: ["Brown", "Black"], sizes: ["One Size"], image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop", material: "Monogram Canvas", inStock: true, description: "Iconic designer tote with signature monogram." },
  { id: "a5", name: "Sports Cap", brand: "Nike", category: "Accessories", occasion: ["Sports", "Casual", "College"], budget: "low", price: 25, colors: ["Black", "White", "Red"], sizes: ["One Size"], image: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=600&h=800&fit=crop", material: "Cotton", inStock: true, description: "Moisture-wicking sports cap for active wear." },
  { id: "a6", name: "Crossbody Bag", brand: "Puma", category: "Accessories", occasion: ["Casual", "Sports", "College"], budget: "low", price: 30, colors: ["Black", "Navy"], sizes: ["One Size"], image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop", material: "Nylon", inStock: true, description: "Compact crossbody bag for essentials on the go." },
  { id: "a7", name: "Gold Chain Necklace", brand: "Calvin Klein", category: "Accessories", occasion: ["Party", "Formal"], budget: "medium", price: 75, colors: ["Gold"], sizes: ["One Size"], image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop", material: "Gold Plated", inStock: true, description: "Elegant gold chain necklace for any occasion." },
];
