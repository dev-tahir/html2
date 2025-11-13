"use client";

import { ModelResponse } from "@/lib/types";
import { useState } from "react";

interface HTMLDisplayProps {
  responses: ModelResponse[];
}

export default function HTMLDisplay({ responses }: HTMLDisplayProps) {
  const [viewMode, setViewMode] = useState<{ [key: string]: "preview" | "code" }>(
    {}
  );

  if (responses.length === 0) {
    return null;
  }

  const toggleViewMode = (model: string) => {
    setViewMode((prev) => ({
      ...prev,
      [model]: prev[model] === "code" ? "preview" : "code",
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Generated HTML Pages
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {responses.map((response) => {
          const currentMode = viewMode[response.model] || "preview";
          const modelName =
            response.model.split("/")[1] || response.model;

          return (
            <div
              key={response.model}
              className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg"
            >
              <div className="bg-gray-100 px-4 py-3 border-b-2 border-gray-300 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{modelName}</h3>
                  <p className="text-xs text-gray-500">{response.model}</p>
                </div>
                <button
                  onClick={() => toggleViewMode(response.model)}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  {currentMode === "preview" ? "View Code" : "View Preview"}
                </button>
              </div>

              <div className="p-4">
                {response.loading && (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <span className="ml-3 text-gray-600">Generating...</span>
                  </div>
                )}

                {response.error && (
                  <div className="bg-red-50 border-2 border-red-300 rounded p-4">
                    <p className="text-red-700 font-medium">Error:</p>
                    <p className="text-red-600 text-sm mt-1">{response.error}</p>
                  </div>
                )}

                {!response.loading && !response.error && response.content && (
                  <>
                    {currentMode === "preview" ? (
                      <div className="border-2 border-gray-200 rounded min-h-[400px] bg-white">
                        <iframe
                          srcDoc={response.content}
                          className="w-full h-[500px] border-0"
                          title={`Preview for ${response.model}`}
                          sandbox="allow-scripts"
                        />
                      </div>
                    ) : (
                      <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-auto max-h-[500px]">
                        <pre className="text-xs">
                          <code>{response.content}</code>
                        </pre>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
