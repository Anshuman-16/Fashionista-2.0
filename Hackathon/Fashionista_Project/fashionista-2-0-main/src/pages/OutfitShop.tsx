import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { PRODUCTS, BRANDS, CATEGORIES, OCCASIONS, COLOR_OPTIONS, Product } from "@/data/products";
import { formatPrice } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, ArrowLeft, Filter, X, Sparkles, Heart,
  Check, Minus, Plus, Package, Star,
} from "lucide-react";

const OutfitShop = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { addItem, totalItems } = useCart();
  const country = profile?.country || "United States";

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedBudget, setSelectedBudget] = useState<string>("All");
  const [selectedOccasion, setSelectedOccasion] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  const filtered = PRODUCTS.filter((p) => {
    if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
    if (selectedBudget !== "All" && p.budget !== selectedBudget) return false;
    if (selectedOccasion !== "All" && !p.occasion.includes(selectedOccasion)) return false;
    if (selectedBrand !== "All" && p.brand !== selectedBrand) return false;
    if (selectedColor !== "All" && !p.colors.includes(selectedColor)) return false;
    return true;
  });

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      size: selectedSize || product.sizes[0],
      color: product.colors[0],
      category: product.category,
    });
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 1500);
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedBudget("All");
    setSelectedOccasion("All");
    setSelectedBrand("All");
    setSelectedColor("All");
  };

  const activeFilterCount = [selectedCategory, selectedBudget, selectedOccasion, selectedBrand, selectedColor].filter(
    (v) => v !== "All"
  ).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-display text-lg font-bold">Outfit Shop</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              {activeFilterCount > 0 && (
                <Badge variant="default" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
            <Button variant="outline" size="sm" className="gap-2 relative" onClick={() => navigate("/cart")}>
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar Filters — Desktop */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">Filters</h3>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-xs text-primary hover:underline">
                  Clear all
                </button>
              )}
            </div>

            <FilterSelect label="Category" value={selectedCategory} onChange={setSelectedCategory} options={["All", ...CATEGORIES]} />
            <FilterSelect label="Budget" value={selectedBudget} onChange={setSelectedBudget} options={["All", "low", "medium", "high"]} displayMap={{ low: "Low (Under $50)", medium: "Medium ($50-$150)", high: "High ($150+)" }} />
            <FilterSelect label="Occasion" value={selectedOccasion} onChange={setSelectedOccasion} options={["All", ...OCCASIONS]} />
            <FilterSelect label="Brand" value={selectedBrand} onChange={setSelectedBrand} options={["All", ...BRANDS]} />

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Color</label>
              <div className="flex flex-wrap gap-2">
                {["All", ...COLOR_OPTIONS].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                      selectedColor === color
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-foreground border-border hover:border-primary/50"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed inset-0 bg-background z-40 p-6 overflow-y-auto md:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-bold">Filters</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-6">
                <FilterSelect label="Category" value={selectedCategory} onChange={setSelectedCategory} options={["All", ...CATEGORIES]} />
                <FilterSelect label="Budget" value={selectedBudget} onChange={setSelectedBudget} options={["All", "low", "medium", "high"]} displayMap={{ low: "Low", medium: "Medium", high: "High" }} />
                <FilterSelect label="Occasion" value={selectedOccasion} onChange={setSelectedOccasion} options={["All", ...OCCASIONS]} />
                <FilterSelect label="Brand" value={selectedBrand} onChange={setSelectedBrand} options={["All", ...BRANDS]} />
                <div className="space-y-2">
                  <label className="text-sm font-medium">Color</label>
                  <div className="flex flex-wrap gap-2">
                    {["All", ...COLOR_OPTIONS].map((color) => (
                      <button key={color} onClick={() => setSelectedColor(color)} className={`px-3 py-1.5 rounded-full text-xs border ${selectedColor === color ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border"}`}>{color}</button>
                    ))}
                  </div>
                </div>
              </div>
              <Button className="w-full mt-8" onClick={() => setShowFilters(false)}>Show {filtered.length} results</Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">{filtered.length} products</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="group cursor-pointer"
                onClick={() => { setSelectedProduct(product); setSelectedSize(product.sizes[0]); }}
              >
                <div className="relative rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute top-3 right-3">
                    <button className="bg-card/80 backdrop-blur-sm rounded-full p-2 hover:bg-card transition-colors">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                  {product.budget === "high" && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-fashion-gold text-foreground text-xs border-0">Premium</Badge>
                    </div>
                  )}
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                    <h3 className="text-sm font-medium text-foreground truncate">{product.name}</h3>
                    <p className="text-sm font-bold text-primary mt-1">
                      {formatPrice(product.price, country)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
              <Button variant="outline" onClick={clearFilters}>Clear filters</Button>
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-secondary">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <DialogHeader>
                  <p className="text-sm text-primary font-medium">{selectedProduct.brand}</p>
                  <DialogTitle className="font-display text-2xl">{selectedProduct.name}</DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-fashion-gold">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <span className="text-xs text-muted-foreground">(128 reviews)</span>
                </div>
                <p className="text-2xl font-bold text-primary mt-4">{formatPrice(selectedProduct.price, country)}</p>
                <p className="text-sm text-muted-foreground mt-3">{selectedProduct.description}</p>
                <div className="mt-4 space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Material:</span> {selectedProduct.material}</p>
                  <p><span className="text-muted-foreground">Colors:</span> {selectedProduct.colors.join(", ")}</p>
                  <p>
                    <span className="text-muted-foreground">Status:</span>{" "}
                    <span className={selectedProduct.inStock ? "text-primary" : "text-destructive"}>
                      {selectedProduct.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </p>
                </div>
                <div className="mt-4 space-y-2">
                  <label className="text-sm font-medium">Size</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                          selectedSize === size ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-auto pt-6 flex gap-3">
                  <Button
                    className="flex-1 gap-2"
                    onClick={() => handleAddToCart(selectedProduct)}
                    disabled={addedToCart === selectedProduct.id}
                  >
                    {addedToCart === selectedProduct.id ? (
                      <><Check className="h-4 w-4" /> Added!</>
                    ) : (
                      <><ShoppingCart className="h-4 w-4" /> Add to Cart</>
                    )}
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => { handleAddToCart(selectedProduct); navigate("/cart"); }}>
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const FilterSelect = ({
  label,
  value,
  onChange,
  options,
  displayMap,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  displayMap?: Record<string, string>;
}) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-foreground">{label}</label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger><SelectValue /></SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {displayMap?.[opt] || opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default OutfitShop;
