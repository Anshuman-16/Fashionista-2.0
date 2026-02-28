import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();
  const { profile, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold text-foreground">StyleSense</span>
          </div>
          <div className="flex items-center gap-3">
            {profile && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{profile.name}</span>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={() => { logout(); navigate("/"); }}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Welcome, {profile?.name || "Fashionista"}!
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Choose your fashion journey. Shop the latest trends or get AI-powered outfit suggestions.
          </p>
        </motion.div>

        {/* Two Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -6 }}
            onClick={() => navigate("/shop")}
            className="cursor-pointer group"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-lg h-80">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary rounded-full p-3">
                    <ShoppingBag className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-card">Outfit Shop</h2>
                </div>
                <p className="text-card/80 text-sm">
                  Browse curated collections from H&M, Zara, Nike, Gucci & more. Filter by brand, budget, occasion, and color.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -6 }}
            onClick={() => navigate("/style-advisor")}
            className="cursor-pointer group"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-lg h-80">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-accent rounded-full p-3">
                    <Sparkles className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-card">AI Style Advisor</h2>
                </div>
                <p className="text-card/80 text-sm">
                  Get personalized outfit recommendations based on your body shape, skin tone, and occasion.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
