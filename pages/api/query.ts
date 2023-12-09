import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export const config = {
  supportsResponseStreaming: true,
};

async function streamProxyHandler(req: NextRequest) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { collectionId, documentId, query, topK, stream, includeChunks } =
      await req.json();

    const requestStream = await fetch("https://raghost.ai/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RAGHOST_API_KEY}`,
      },
      body: JSON.stringify({
        collectionId,
        documentId,
        query,
        topK,
        stream,
        includeChunks,
      }),
    });

    if (!requestStream.ok) {
      throw new Error(`HTTP error! Status: ${requestStream.status}`);
    }

    // Stream the response back
    return new Response(requestStream.body);
  } catch (error) {
    console.error("Error in stream proxy:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export default streamProxyHandler;
