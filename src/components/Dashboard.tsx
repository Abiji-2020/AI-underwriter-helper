import React, { useState, useEffect } from "react";
import { Controls } from "./Controls";
import { Receipt } from "./Receipt";
import { Assistant } from "./Assistant";
import {
  calculatePremium,
  RatingInputs,
  RatingResult,
} from "../utils/ratingLogic";

export const Dashboard: React.FC = () => {
  const [inputs, setInputs] = useState<RatingInputs>({
    industry: "Construction",
    revenue: 1000000,
    yearsInBusiness: 1,
    priorClaims: 0,
    baseRate: 500,
  });

  const [result, setResult] = useState<RatingResult>({
    finalPrice: 0,
    trace: [],
  });

  useEffect(() => {
    const res = calculatePremium(inputs);
    setResult(res);
  }, [inputs]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 flex-1 bg-gray-50 min-h-full">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-fit">
        <Controls inputs={inputs} setInputs={setInputs} />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-fit">
        <Receipt trace={result.trace} finalPrice={result.finalPrice} />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-fit">
        <Assistant
          trace={result.trace}
          finalPrice={result.finalPrice}
          inputs={inputs}
        />
      </div>
    </div>
  );
};
