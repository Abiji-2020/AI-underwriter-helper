import { describe, it, expect } from 'vitest';
import { calculatePremium, RatingInputs } from './ratingLogic';

describe('calculatePremium', () => {
    it('calculates base case correctly (Construction, $1M, 0 years, 0 claims)', () => {
        const inputs: RatingInputs = {
            industry: 'Construction',
            revenue: 1000000,
            yearsInBusiness: 1,
            priorClaims: 0,
            baseRate: 500,
        };
        // Base: 500
        // Exposure: 1000 * 2 = 2000 -> 2500
        // Industry: 2500 * 1.75 = 4375
        const result = calculatePremium(inputs);
        expect(result.finalPrice).toBe(4375);

        expect(result.trace[0].description).toBe('Base Rate');
        expect(result.trace[0].runningTotal).toBe(500);

        expect(result.trace[1].description).toContain('Added Exposure');
        expect(result.trace[1].runningTotal).toBe(2500);

        expect(result.trace[2].description).toContain('Construction Factor');
        expect(result.trace[2].runningTotal).toBe(4375);
    });

    it('applies stability discount correctly (>3 years)', () => {
        const inputs: RatingInputs = {
            industry: 'Retail',
            revenue: 500000,
            yearsInBusiness: 4,
            priorClaims: 0,
            baseRate: 500,
        };
        // Base: 500
        // Exposure: 500 * 2 = 1000 -> 1500
        // Industry: 1500 * 1.1 = 1650
        // Stability: 1650 * 0.9 = 1485
        const result = calculatePremium(inputs);
        expect(result.finalPrice).toBe(1485);
        expect(result.trace.some(t => t.description.includes('Stability Discount'))).toBe(true);
    });
});
