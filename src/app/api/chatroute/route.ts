import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { Pinecone } from "@pinecone-database/pinecone";
import { Message, StreamData, streamText } from "ai";
import { queryPineconeVectorStore } from "../../../../utils";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY ?? "",
});

const google = createGoogleGenerativeAI({
  baseURL: "https://generativelanguage.googleapis.com/v1beta",
  apiKey: process.env.GEMINI_API_KEY,
});

const model = google("models/gemini-1.5-pro-latest", {
  safetySettings: [
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
  ],
});

export async function POST(req: Request) {
  const reqBody = await req.json();

  const messages: Message[] = reqBody.messages;
  const userQuestion = `${messages[messages.length - 1].content}`;

  const query = `Represent this sentence for searching relevant passages: questions about the resume: \n\n${userQuestion}`;

  const retrievals = await queryPineconeVectorStore(
    pinecone,
    "chatbot",
    "",
    query
  );

  const finalPrompt = `Here is a question regarding the resume.
  
  \n\n**User Query:**\n${userQuestion}?
  \n**end of user query** 

  \n\n**Generic answers findings:**
  \n\n${retrievals}. 
  \n\n**end of generic answers findings** 

  \n\nProvide thorough justification for your answer.
  \n\n**Answer:**
  `;

  const data = new StreamData();
  data.append({
    retrievals: retrievals,
  });

  const result = await streamText({
    model: model,
    prompt: finalPrompt,
    onFinish() {
      data.close();
    },
  });

  return result.toDataStreamResponse({ data });
}
