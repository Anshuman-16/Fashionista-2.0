import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/lib/currency";
import { generateRecommendation, OutfitRecommendation } from "@/lib/recommendations";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, Upload, RefreshCw, Shirt, Watch, User } from "lucide-react";

const BODY_SHAPES = ["Hourglass", "Rectangle", "Pear", "Apple", "Inverted Triangle", "Athletic", "Oval"];
const SKIN_TONES = ["Fair", "Light", "Medium", "Olive", "Tan", "Dark"];
const ADVISOR_OCCASIONS = ["Casual", "College", "Party", "Formal", "Business", "Date Night", "Sports", "Wedding", "Beach"];
const GENDERS = ["Male", "Female", "Non-Binary"];

const StyleAdvisor = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const country = profile?.country || "United States";

  const [gender, setGender] = useState("");
  const [bodyShape, setBodyShape] = useState("");
  const [skinTone, setSkinTone] = useState("");
  const [occasion, setOccasion] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<OutfitRecommendation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const rec = generateRecommendation(occasion, gender, bodyShape, skinTone);
      setRecommendation(rec);
      setIsGenerating(false);
    }, 800);
  };

  const canGenerate = gender && bodyShape && skinTone && occasion;

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
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="font-display text-lg font-bold">AI Style Advisor</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid lg:grid-cols-[380px,1fr] gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> About You
              </h2>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent>
                      {GENDERS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Body Shape</Label>
                  <Select value={bodyShape} onValueChange={setBodyShape}>
                    <SelectTrigger><SelectValue placeholder="Select body shape" /></SelectTrigger>
                    <SelectContent>
                      {BODY_SHAPES.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Skin Tone</Label>
                  <Select value={skinTone} onValueChange={setSkinTone}>
                    <SelectTrigger><SelectValue placeholder="Select skin tone" /></SelectTrigger>
                    <SelectContent>
                      {SKIN_TONES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Occasion</Label>
                  <Select value={occasion} onValueChange={setOccasion}>
                    <SelectTrigger><SelectValue placeholder="Select occasion" /></SelectTrigger>
                    <SelectContent>
                      {ADVISOR_OCCASIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Upload Your Outfit (optional)</Label>
                  <label className="block cursor-pointer">
                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                      {uploadedImage ? (
                        <div className="relative">
                          <img src={uploadedImage} alt="Uploaded outfit" className="w-full h-40 object-cover rounded-lg" />
                          <button
                            onClick={(e) => { e.preventDefault(); setUploadedImage(null); }}
                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Click to upload an outfit image</p>
                        </>
                      )}
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>

              <Button
                className="w-full mt-6 h-12 text-base font-semibold gap-2"
                disabled={!canGenerate || isGenerating}
                onClick={handleGenerate}
              >
                {isGenerating ? (
                  <><RefreshCw className="h-5 w-5 animate-spin" /> Generating...</>
                ) : recommendation ? (
                  <><RefreshCw className="h-5 w-5" /> Generate New Combination</>
                ) : (
                  <><Sparkles className="h-5 w-5" /> Get Recommendations</>
                )}
              </Button>
            </div>
          </div>

          {/* Results Panel */}
          <div>
            <AnimatePresence mode="wait">
              {!recommendation && !isGenerating && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center py-20"
                >
                  <Sparkles className="h-16 w-16 text-muted-foreground/30 mb-6" />
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    Your Personal Style Awaits
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    Fill in your details and let our AI create the perfect outfit combination for you.
                  </p>
                </motion.div>
              )}

              {isGenerating && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center py-20"
                >
                  <div className="relative">
                    <Sparkles className="h-16 w-16 text-primary animate-pulse" />
                  </div>
                  <p className="text-lg font-medium text-foreground mt-6">Curating your perfect look...</p>
                </motion.div>
              )}

              {recommendation && !isGenerating && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Title & Tip */}
                  <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                      {recommendation.title}
                    </h2>
                    <p className="text-muted-foreground italic">"{recommendation.tip}"</p>
                    {uploadedImage && (
                      <p className="text-sm text-primary mt-3">
                        ✨ Based on your uploaded outfit, we've matched complementary pieces that enhance your existing style.
                      </p>
                    )}
                  </div>

                  {/* Outfit Items */}
                  <div>
                    <h3 className="font-display text-lg font-semibold flex items-center gap-2 mb-4">
                      <Shirt className="h-5 w-5 text-primary" /> Complete Outfit
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {recommendation.items.map((item, i) => (
                        <motion.div
                          key={`${item.name}-${i}`}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-card rounded-xl border border-border overflow-hidden shadow-sm"
                        >
                          <div className="aspect-[3/4] overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <div className="p-3">
                            <p className="text-xs text-primary font-medium">{item.brand}</p>
                            <h4 className="text-sm font-medium text-foreground truncate">{item.name}</h4>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-muted-foreground">{item.color} · {item.category}</span>
                              <span className="text-sm font-bold text-primary">{formatPrice(item.price, country)}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Accessories */}
                  <div>
                    <h3 className="font-display text-lg font-semibold flex items-center gap-2 mb-4">
                      <Watch className="h-5 w-5 text-accent" /> Accessories
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {recommendation.accessories.map((acc, i) => (
                        <motion.div
                          key={`${acc.name}-${i}`}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="bg-card rounded-xl border border-border overflow-hidden shadow-sm"
                        >
                          <div className="aspect-square overflow-hidden">
                            <img src={acc.image} alt={acc.name} className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <div className="p-3">
                            <p className="text-xs text-accent font-medium">{acc.brand}</p>
                            <h4 className="text-sm font-medium text-foreground truncate">{acc.name}</h4>
                            <span className="text-sm font-bold text-primary">{formatPrice(acc.price, country)}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-semibold">Estimated Total</span>
                      <span className="font-display text-2xl font-bold text-primary">
                        {formatPrice(
                          [...recommendation.items, ...recommendation.accessories].reduce((s, i) => s + i.price, 0),
                          country
                        )}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleAdvisor;
