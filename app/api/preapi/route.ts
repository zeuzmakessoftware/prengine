import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { input } = await request.json();

    if (!input || input.trim() === "") {
      return NextResponse.json({ error: "Input is required" }, { status: 400 });
    }

    const systemMessage = "###  SYSTEM PROMPT (Blog Generator — Long Form with Theme Support): You are a blog-writing AI. Your job is to generate a **long-form blog post** in rich Markdown based on a given **slug** and **theme**, and return the result in the strict JSON format below. --- ### ✅ JSON Output Structure: ```json { \"title\": \"Generated blog post title (if slug starts with 'what-is-', format as 'What Is SoAndSo?')\", \"content\": { \"markdown\": \"## Introduction Full intro paragraph... ## Section 1 Well-developed paragraph(s)... ## Section 2 ... ## Section 3 ... ## Section 4 ... ## Section 5 ... ## Conclusion Final takeaways and reflections.\" }, \"excerpt\": \"A concise, engaging 1–2 sentence summary of the blog post.\", \"tags\": [\"Relevant\", \"SEO\", \"Tags\"], \"categories\": [\"Primary category\", \"Secondary category\"], \"meta\": { \"title\": \"SEO-optimized page title\", \"description\": \"SEO meta description based on blog content\" }, \"theme\": \"Short phrase describing the perspective used (e.g., 'business analysis', 'developer tutorial', 'educational overview')\" } ``` --- ### 🧠 Behavior Instructions: - Use the **slug** to determine the **topic** of the blog post. - If the slug starts with \"what-is-\", format the title as \"What Is [RestOfSlug]?\" (capitalized properly) - Otherwise, generate a title based on the slug and theme - Use the **theme** to set the **angle, tone, and audience**. - Write a **long-form** blog post with a clear structure: - At least **7 sections** (intro, 5+ in-depth sections, conclusion). - Each section should contain **detailed, multi-sentence paragraphs**. - Use proper **Markdown formatting** (`##` headings, `-` lists, `**bold**` where needed). - The **excerpt** should be 1–2 punchy, readable sentences summarizing the post for social/media cards. - Generate **relevant and specific tags and categories** based on the topic and theme. - Generate an **SEO-optimized** `meta.title` and `meta.description`. --- ### 📝 Input: ```json { \"slug\": \"what-is-machine-learning\", \"theme\": \"educational overview\" } ``` --- ### 🚀 Output: Return only the JSON object above. Do **not** include any extra text or explanations. Your content should be publication-ready and Markdown-safe.";
    const chatMessage = `
        {
            "slug": "${input}",
            "theme": "programmatic seo"
        }
    `

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemMessage,
        },
        {
          role: 'user',
          content: chatMessage,
        },
      ],
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      response_format: { type: 'json_object' },
    });

    const responseContent = completion.choices[0].message.content;
    
    if (!responseContent) {
      return NextResponse.json(
        { error: 'No response content returned from the model' },
        { status: 500 }
      );
    }
    
    const jsonResponse = JSON.parse(responseContent);

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}