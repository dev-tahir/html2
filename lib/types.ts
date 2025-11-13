export interface ModelConfig {
  id: string;
  name: string;
}

export interface ModelResponse {
  model: string;
  content: string;
  error?: string;
  loading?: boolean;
}

export const AVAILABLE_MODELS: ModelConfig[] = [
  {
    id: "google/gemini-2.5-flash-lite-preview-09-2025",
    name: "Google Gemini 2.5 Flash Lite",
  },
  {
    id: "z-ai/glm-4.6",
    name: "GLM-4.6",
  },
  {
    id: "openai/gpt-5-codex",
    name: "GPT-5 Codex",
  },
  {
    id: "anthropic/claude-sonnet-4.5",
    name: "Claude Sonnet 4.5",
  },
];
