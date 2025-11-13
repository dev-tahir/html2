"use client";

import { ModelConfig } from "@/lib/types";

interface ModelSelectorProps {
  models: ModelConfig[];
  selectedModels: string[];
  onToggleModel: (modelId: string) => void;
}

export default function ModelSelector({
  models,
  selectedModels,
  onToggleModel,
}: ModelSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">
        Select Models (multiple allowed)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {models.map((model) => {
          const isSelected = selectedModels.includes(model.id);
          return (
            <button
              key={model.id}
              onClick={() => onToggleModel(model.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{model.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{model.id}</div>
                </div>
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    isSelected
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
