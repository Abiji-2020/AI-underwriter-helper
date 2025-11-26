import React from "react";
import type { Industry, RatingInputs } from "../utils/ratingLogic";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ControlsProps {
  inputs: RatingInputs;
  setInputs: React.Dispatch<React.SetStateAction<RatingInputs>>;
}

export const Controls: React.FC<ControlsProps> = ({ inputs, setInputs }) => {
  const handleChange = (field: keyof RatingInputs, value: string | number) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card className="h-full border-none shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Submission Details
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 flex flex-col gap-6">
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Select
            value={inputs.industry}
            onValueChange={(value) =>
              handleChange("industry", value as Industry)
            }
          >
            <SelectTrigger id="industry">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Construction">Construction</SelectItem>
              <SelectItem value="Retail">Retail</SelectItem>
              <SelectItem value="Software">Software</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="baseRate">Base Rate ($)</Label>
          <Input
            id="baseRate"
            type="number"
            value={inputs.baseRate}
            onChange={(e) =>
              handleChange(
                "baseRate",
                Math.max(0, parseInt(e.target.value) || 0),
              )
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="revenue">Revenue ($)</Label>
          <Input
            id="revenue"
            type="number"
            value={inputs.revenue}
            onChange={(e) =>
              handleChange(
                "revenue",
                Math.max(0, parseInt(e.target.value) || 0),
              )
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="years">Years in Business</Label>
          <Input
            id="years"
            type="number"
            value={inputs.yearsInBusiness}
            onChange={(e) =>
              handleChange(
                "yearsInBusiness",
                Math.max(0, parseInt(e.target.value) || 0),
              )
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="claims">Prior Claims</Label>
          <Input
            id="claims"
            type="number"
            value={inputs.priorClaims}
            onChange={(e) =>
              handleChange(
                "priorClaims",
                Math.max(0, parseInt(e.target.value) || 0),
              )
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};
