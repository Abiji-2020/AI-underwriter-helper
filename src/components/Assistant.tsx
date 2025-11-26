import React from 'react';
import { Copy, Sparkles, Mail } from 'lucide-react';
import type { TraceItem } from '../utils/ratingLogic';
import { useAiAssistant } from '../hooks/useAiAssistant';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface AssistantProps {
    trace: TraceItem[];
    finalPrice: number;
    inputs: any;
}

export const Assistant: React.FC<AssistantProps> = ({ trace, finalPrice, inputs }) => {
    const { mutate, data, isPending, isError } = useAiAssistant();

    const handleCopy = () => {
        if (data?.email) {
            navigator.clipboard.writeText(data.email);
            alert('Email draft copied to clipboard!');
        }
    };

    return (
        <Card className="h-full border-none shadow-none bg-white">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Sparkles size={20} className="text-gray-900" />
                    Underwriting Assistant
                </CardTitle>
            </CardHeader>
            <CardContent className="px-0 flex flex-col gap-4">
                <Button
                    onClick={() => mutate({ trace, price: finalPrice, inputs })}
                    disabled={isPending}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                >
                    {isPending ? 'Analyzing Risk Profile...' : 'Generate AI Report'}
                </Button>

                {isError && (
                    <div className="text-red-500 text-sm">Error generating report. Please check your API key or try again.</div>
                )}

                {data && (
                    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Email Draft - Prominent */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 relative">
                            <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
                                <Mail size={16} />
                                Broker Email Draft
                            </div>
                            <button
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 transition-colors"
                                onClick={handleCopy}
                                title="Copy to Clipboard"
                            >
                                <Copy size={16} />
                            </button>
                            <div className="text-sm text-gray-600 whitespace-pre-wrap font-mono leading-relaxed bg-white p-3 rounded border border-gray-100">
                                {data.email}
                            </div>
                        </div>

                        {/* Analysis - Collapsible */}
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="analysis" className="border-gray-200">
                                <AccordionTrigger className="text-sm font-medium text-gray-700 hover:no-underline">
                                    View Detailed Analysis
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-900 leading-relaxed">
                                        {data.insight}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
