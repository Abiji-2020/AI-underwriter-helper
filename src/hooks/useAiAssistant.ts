import { useMutation } from '@tanstack/react-query';
import type { TraceItem } from '../utils/ratingLogic';

interface AIResponse {
    insight: string;
    email: string;
}

interface AIRequest {
    trace: TraceItem[];
    price: number;
    inputs: any;
}

const fetchAIReport = async (data: AIRequest): Promise<AIResponse> => {
    const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to generate report');
    }

    return response.json();
};

export const useAiAssistant = () => {
    return useMutation({
        mutationFn: fetchAIReport,
    });
};
