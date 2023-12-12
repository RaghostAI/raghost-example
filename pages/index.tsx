import React, { useState, useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";

export function QueryBlock(props: { collectionId?: string }) {
  const { collectionId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [question, setQuestion] = useState("");

  const handleQuerySubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const responseStream = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collectionId, query: question, stream: true }),
      });

      if (responseStream.status !== 200) {
        const data = await responseStream.json();
        console.log("Error", data);
        return;
      }

      const data = responseStream.body;
      // @ts-ignore
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let fullValue = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        fullValue += chunkValue;

        setResponse(fullValue);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error querying collection:", error);
    }
  }, [question]);

  const bookPdfLink =
    "https://github.com/varunkashyapks/Books/blob/master/High-Performance-Browser-Networking-Ilya-Grigorik.pdf";

  const sampleQuestions = [
    "What is TCP?",
    "Tell me about Server-Sent Events",
    "Tell me about WebSockets",
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-semibold self-start">
        Query <b>High Performance Browser Networking</b> by Ilya Grigorik
      </div>
      <div className="self-start mb-4">
        Book available on GitHub{" "}
        <a
          className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline"
          href={bookPdfLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          here.
        </a>
      </div>
      <input
        value={question}
        onChange={(e: any) => setQuestion(e.target.value)}
        placeholder="Tell me about Server-Sent Events"
        className="border border-gray-300 rounded-md p-2"
      />
      <div className="flex flex-col gap-2 -mt-2 mb-2">
        {sampleQuestions.map((sampleQuestion) => (
          <div
            key={sampleQuestion}
            className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline"
            onClick={() => setQuestion(sampleQuestion)}
          >
            {sampleQuestion}
          </div>
        ))}
      </div>
      {isLoading && <button disabled>Loading...</button>}
      {!isLoading && (
        <button
          onClick={handleQuerySubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      )}
      {response && (
        <div className="py-8 self-start">
          <b>Response:</b> {response}
        </div>
      )}
    </div>
  );
}

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>RagHost Sample App</title>
      </Head>

      <main className="flex flex-1 w-full flex-col items-center pt-40 px-20">
        <div className="w-full max-w-lg">
          <QueryBlock collectionId="clpmxm8680002r121ade4sbp3" />
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        Powered by
        <a
          className="ml-1 text-blue-500 hover:text-blue-700 transition-colors"
          href="https://raghost.ai"
          target="_blank"
          rel="noopener noreferrer"
        >
          RagHost
        </a>
      </footer>
    </div>
  );
};

export default Home;
