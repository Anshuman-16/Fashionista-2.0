import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Sparkles } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const country = profile?.country || "United States";

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto flex items-center h-16 px-4 gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/shop")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-display text-lg font-bold">Shopping Cart</span>
            </div>
          </div>
        </header>
        <div className="flex flex-col items-center justify-center py-32 text-center px-4">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-6" />
          <h2 className="font-display text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Explore our collection and find something you love.</p>
          <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/shop")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-display text-lg font-bold">Shopping Cart</span>
            </div>
          </div>
          <button onClick={clearCart} className="text-sm text-destructive hover:underline">Clear all</button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border p-4 flex gap-4"
            >
              <div className="w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-secondary">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-primary font-medium">{item.brand}</p>
                <h3 className="text-sm font-medium text-foreground truncate">{item.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">Size: {item.size} · {item.color}</p>
                <p className="text-sm font-bold text-primary mt-2">{formatPrice(item.price, country)}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2 border border-border rounded-lg">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-secondary rounded-l-lg">
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-secondary rounded-r-lg">
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-card rounded-2xl border border-border p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(totalPrice, country)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-primary">Free</span>
            </div>
            <div className="border-t border-border my-3" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">{formatPrice(totalPrice, country)}</span>
            </div>
          </div>
          <Button className="w-full mt-6 h-12 text-base font-semibold">Proceed to Checkout</Button>
          <p className="text-xs text-muted-foreground text-center mt-3">This is a simulated checkout.</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
