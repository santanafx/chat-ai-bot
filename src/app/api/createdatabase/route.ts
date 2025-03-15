import { PineconeStore } from "@langchain/community/vectorstores/pinecone";

import { OllamaEmbeddings } from "@langchain/ollama";
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
import fs from "fs";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import path from "path";

dotenv.config();

export async function POST() {
  const client = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  const pineconeIndex = client.Index(process.env.PINECONE_INDEX_NAME!);

  const embeddings = new OllamaEmbeddings({
    model: "mxbai-embed-large",
    maxConcurrency: 5,
  });

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
  });

  const bookPath = path.join(process.cwd(), "docs", "resume.txt");
  const bookContent = fs.readFileSync(bookPath, "utf-8");

  const textSpliter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const splitTexts = await textSpliter.splitText(bookContent);

  const docs = splitTexts.map(
    (text, index) =>
      new Document({ pageContent: text, metadata: { id: index, chunk: text } })
  );

  await vectorStore.addDocuments(docs);

  return new Response(
    JSON.stringify({ message: "Document successfully saved to Pinecone!" }),
    { status: 200 }
  );
}
