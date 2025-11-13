const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function generateHTML(
  prompt: string,
  model: string
): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OpenRouter API key not found");
  }

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": typeof window !== "undefined" ? window.location.origin : "",
        "X-Title": "HTML Generator App",
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "system",
            content:
              "You are an expert HTML developer. Generate complete, valid HTML pages based on user requests. Include inline CSS for styling. Return only the HTML code without any explanation or markdown formatting.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}. ${
          errorData.error?.message || ""
        }`
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Extract HTML if wrapped in markdown code blocks
    const htmlMatch = content.match(/```html\n([\s\S]*?)\n```/);
    if (htmlMatch) {
      return htmlMatch[1].trim();
    }

    return content.trim();
  } catch (error) {
    console.error(`Error generating HTML with ${model}:`, error);
    throw error;
  }
}

export async function generateHTMLParallel(
  prompt: string,
  models: string[]
): Promise<
  Array<{
    model: string;
    content: string;
    error?: string;
  }>
> {
  const promises = models.map(async (model) => {
    try {
      const content = await generateHTML(prompt, model);
      return { model, content };
    } catch (error) {
      return {
        model,
        content: "",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  });

  return Promise.all(promises);
}
