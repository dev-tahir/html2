"use client";

import { useState } from "react";
import ModelSelector from "@/components/ModelSelector";
import ChatInput from "@/components/ChatInput";
import HTMLDisplay from "@/components/HTMLDisplay";
import { AVAILABLE_MODELS } from "@/lib/types";
import { generateHTMLParallel } from "@/lib/openrouter";
import type { ModelResponse } from "@/lib/types";

export default function Home() {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [responses, setResponses] = useState<ModelResponse[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleToggleModel = (modelId: string) => {
    setSelectedModels((prev) =>
      prev.includes(modelId)
        ? prev.filter((id) => id !== modelId)
        : [...prev, modelId]
    );
  };

  const handleGenerate = async (prompt: string) => {
    if (selectedModels.length === 0) {
      alert("Please select at least one model");
      return;
    }

    setIsGenerating(true);

    // Initialize responses with loading states
    const initialResponses: ModelResponse[] = selectedModels.map((model) => ({
      model,
      content: "",
      loading: true,
    }));
    setResponses(initialResponses);

    try {
      const results = await generateHTMLParallel(prompt, selectedModels);

      // Update responses with results
      const finalResponses: ModelResponse[] = results.map((result) => ({
        model: result.model,
        content: result.content,
        error: result.error,
        loading: false,
      }));

      setResponses(finalResponses);
    } catch (error) {
      console.error("Error generating HTML:", error);
      alert("An error occurred while generating HTML");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Multi-Model HTML Generator
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Select multiple AI models and generate HTML pages in parallel
        </p>

        <ModelSelector
          models={AVAILABLE_MODELS}
          selectedModels={selectedModels}
          onToggleModel={handleToggleModel}
        />

        <ChatInput onSubmit={handleGenerate} disabled={isGenerating} />

        {selectedModels.length > 0 && !isGenerating && responses.length === 0 && (
          <div className="text-center text-gray-600 mb-8">
            {selectedModels.length} model{selectedModels.length > 1 ? "s" : ""}{" "}
            selected. Enter a prompt to generate HTML.
          </div>
        )}

        <HTMLDisplay responses={responses} />
      </div>
    </div>
  );
}
