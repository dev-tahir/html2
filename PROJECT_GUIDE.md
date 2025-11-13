# Multi-Model HTML Generator

A Next.js application that generates HTML pages using multiple AI models in parallel via OpenRouter API.

## Features

- ✅ **Multi-Model Selection**: Choose from 4 different AI models simultaneously
- ✅ **Parallel Generation**: All selected models generate HTML in parallel for faster results
- ✅ **Live Preview**: View generated HTML in real-time with preview/code toggle
- ✅ **Responsive Design**: Beautiful UI built with Tailwind CSS
- ✅ **Error Handling**: Comprehensive error handling and loading states

## Available Models

1. **Google Gemini 2.5 Flash Lite** - `google/gemini-2.5-flash-lite-preview-09-2025`
2. **GLM-4.6** - `z-ai/glm-4.6`
3. **GPT-5 Codex** - `openai/gpt-5-codex`
4. **Claude Sonnet 4.5** - `anthropic/claude-sonnet-4.5`

## Getting Started

### Prerequisites

- Node.js 20+ installed
- NPM or Yarn package manager

### Installation

1. The project is already set up with dependencies installed

2. The OpenRouter API key is configured in `.env.local`

### Running the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. **Select Models**: Click on one or more model cards to select them (they will highlight in blue)
2. **Enter Prompt**: Type your HTML page description in the text area (e.g., "Create a landing page for a coffee shop with a hero section and menu")
3. **Generate**: Click the "Generate" button
4. **View Results**: See all selected models generate HTML in parallel
5. **Toggle View**: Switch between preview and code view for each result

## Project Structure

```
0appbuilder/
├── app/
│   ├── page.tsx          # Main application page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── ModelSelector.tsx # Multi-select model picker
│   ├── ChatInput.tsx     # Prompt input component
│   └── HTMLDisplay.tsx   # HTML preview/code display
├── lib/
│   ├── openrouter.ts     # OpenRouter API integration
│   └── types.ts          # TypeScript types and model configs
└── .env.local            # Environment variables (API key)
```

## Features Breakdown

### Parallel Execution
The app uses `Promise.all()` to send requests to all selected models simultaneously, significantly reducing wait time when using multiple models.

### Error Handling
- Individual error handling per model
- Loading indicators for each model
- User-friendly error messages
- Network error handling

### UI/UX
- Clean, centered layout
- Model selection with visual feedback
- Responsive grid for multiple results
- Preview/code toggle for each result
- Gradient background with Tailwind CSS

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **OpenRouter API** - AI model access

## Environment Variables

```env
NEXT_PUBLIC_OPENROUTER_API_KEY=your-api-key-here
```

## Build for Production

```bash
npm run build
npm start
```

## Notes

- The API key is stored in `.env.local` and is prefixed with `NEXT_PUBLIC_` to be accessible in the browser
- Each model response is displayed in its own card with preview and code view options
- The iframe sandbox attribute is used for safe HTML preview rendering

## License

MIT
