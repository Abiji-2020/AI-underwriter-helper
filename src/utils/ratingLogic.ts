export type Industry = "Construction" | "Retail" | "Software";

export interface RatingInputs {
  industry: Industry;
  revenue: number;
  yearsInBusiness: number;
  priorClaims: number;
  baseRate: number;
}

export interface TraceItem {
  description: string;
  impact: string;
  runningTotal: number;
}

export interface RatingResult {
  finalPrice: number;
  trace: TraceItem[];
}

const INDUSTRY_MULTIPLIERS: Record<Industry, number> = {
  Construction: 1.75,
  Retail: 1.1,
  Software: 0.85,
};

export const calculatePremium = (inputs: RatingInputs): RatingResult => {
  const trace: TraceItem[] = [];
  let price = inputs.baseRate;

  trace.push({
    description: "Base Rate",
    impact: `$${inputs.baseRate.toFixed(2)}`,
    runningTotal: price,
  });

  // Exposure: Revenue / 1000 * $2
  const exposureCost = (inputs.revenue / 1000) * 2;
  price += exposureCost;
  trace.push({
    description: `Added Exposure (${inputs.revenue / 1000} units * $2)`,
    impact: `+$${exposureCost.toFixed(2)}`,
    runningTotal: price,
  });

  // Industry Multiplier
  const industryMultiplier = INDUSTRY_MULTIPLIERS[inputs.industry];
  const priceBeforeIndustry = price;
  price *= industryMultiplier;
  trace.push({
    description: `Applied ${inputs.industry} Factor (${industryMultiplier}x)`,
    impact: `x${industryMultiplier} (+$${(price - priceBeforeIndustry).toFixed(2)})`,
    runningTotal: price,
  });

  // Stability Discount (>3 years -> 0.90x)
  if (inputs.yearsInBusiness > 3) {
    const priceBeforeStability = price;
    price *= 0.9;
    trace.push({
      description: "Applied Stability Discount (0.9x)",
      impact: `-$${(priceBeforeStability - price).toFixed(2)}`,
      runningTotal: price,
    });
  }

  // Claims Surcharge (1.15x per claim)
  if (inputs.priorClaims > 0) {
    const claimsMultiplier = Math.pow(1.15, inputs.priorClaims);
    const priceBeforeClaims = price;
    price *= claimsMultiplier;
    trace.push({
      description: `Applied Claims Surcharge (${inputs.priorClaims} claims)`,
      impact: `x${claimsMultiplier.toFixed(2)} (+$${(price - priceBeforeClaims).toFixed(2)})`,
      runningTotal: price,
    });
  }

  // Final rounding
  const finalPrice = Math.round(price * 100) / 100;

  // Update last running total to match final rounded price if needed, or just trust the float
  // Let's just return the raw float for running total and format in UI

  return { finalPrice, trace };
};
