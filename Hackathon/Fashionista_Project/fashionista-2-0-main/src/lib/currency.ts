export const CURRENCY_MAP: Record<string, { symbol: string; rate: number }> = {
  India: { symbol: "₹", rate: 83 },
  "United States": { symbol: "$", rate: 1 },
  "United Kingdom": { symbol: "£", rate: 0.79 },
  Germany: { symbol: "€", rate: 0.92 },
  France: { symbol: "€", rate: 0.92 },
  Japan: { symbol: "¥", rate: 149 },
  Canada: { symbol: "C$", rate: 1.36 },
  Australia: { symbol: "A$", rate: 1.53 },
};

export const COUNTRIES = Object.keys(CURRENCY_MAP);

export const formatPrice = (usdPrice: number, country: string): string => {
  const curr = CURRENCY_MAP[country] || CURRENCY_MAP["United States"];
  const converted = Math.round(usdPrice * curr.rate);
  return `${curr.symbol}${converted.toLocaleString()}`;
};
