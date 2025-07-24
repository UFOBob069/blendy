import { pinecone } from './pinecone';
import { openai } from './openai';
import { SYSTEM_PROMPT } from './systemPrompt';

export async function getBlendyResponse(userMessage: string) {
  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

  const embedding = await openai.embeddings.create({
    input: userMessage,
    model: 'text-embedding-3-small',
  });

  const results = await index.query({
    vector: embedding.data[0].embedding,
    topK: 5,
    includeMetadata: true,
  });

  const contextText = results.matches.map((m) => m.metadata?.text).join('\n\n');

  const chat = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT + `\n\nContext:\n${contextText}` },
      { role: 'user', content: userMessage }
    ]
  });

  return chat.choices[0].message.content;
} 