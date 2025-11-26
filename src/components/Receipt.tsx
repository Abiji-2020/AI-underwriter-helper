import React from "react";
import type { TraceItem } from "../utils/ratingLogic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReceiptProps {
  trace: TraceItem[];
  finalPrice: number;
}

export const Receipt: React.FC<ReceiptProps> = ({ trace, finalPrice }) => {
  return (
    <Card className="h-full border-none shadow-none bg-white">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Premium Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="font-mono text-sm space-y-4">
          {trace.map((item, index) => (
            <div
              key={index}
              className="flex flex-col pb-3 border-b border-dashed border-gray-200 last:border-0"
            >
              <div className="grid grid-cols-[1fr_auto] gap-4 text-gray-600">
                <span className="text-left">{item.description}</span>
                <span className="font-medium text-gray-900 text-right">
                  {item.impact}
                </span>
              </div>
              <div className="flex justify-end mt-1 text-xs text-gray-400">
                Running Total: ${item.runningTotal.toFixed(2)}
              </div>
            </div>
          ))}

          <div className="pt-4 mt-4 border-t-2 border-dashed border-gray-300">
            <div className="grid grid-cols-[1fr_auto] gap-4 items-baseline">
              <span className="font-bold text-gray-900 text-lg text-left">
                Total Premium
              </span>
              <span className="font-bold text-2xl text-gray-900 text-right">
                ${finalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
