"use client";

import { useState } from "react";

interface ChatInputProps {
  onSubmit: (prompt: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSubmit, disabled }: ChatInputProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !disabled) {
      onSubmit(prompt);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the HTML page you want to generate..."
          disabled={disabled}
          rows={4}
          className="w-full px-4 py-3 pr-24 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={disabled || !prompt.trim()}
          className="absolute bottom-3 right-3 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Generate
        </button>
      </form>
    </div>
  );
}
