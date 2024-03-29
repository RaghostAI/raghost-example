# RagHost Example App

This example shows how to use the RagHost ([raghost.ai](https://raghost.ai)) API to query some embedded documents.

- [🤔 What is RagHost?](#what-is-raghost)
- [▲ Deploy to Vercel](#deploy-to-vercel)
- [🏁 Getting Started](#getting-started)

In this example, we have already uploaded documents to a collection on RagHost using `/embed`, and this interface lets the user query the collection.

<img width="832" alt="Screenshot 2023-12-12 at 12 39 05 PM" src="https://github.com/RaghostAI/raghost-example/assets/1459660/899fd38d-3aaf-4f23-a713-2172fefcc2c9">

## RagHost Live Demo

See https://raghost-example.vercel.app/ for the live demo.

## What is RagHost?

RagHost lets you rapidly build production-ready RAG (Retrieval-Augmented Generation) pipelines with an easy-to-use API.

You can embed documents using `/embed`, and query your document collections using `/ask`.

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FRaghostAI%2Fraghost-example&env=RAGHOST_API_KEY)

## Getting Started

1. Copy the `.env.example` file.

   ```bash
   cp .env.example .env
   ```

2. Get your API key from [raghost.ai](https://raghost.ai) by signing up and going to the **Settings** page. Add your RagHost API key under `RAGHOST_API_KEY` to your `.env` file.

   ```
   RAGHOST_API_KEY=your-api-key
   ```

3. Enter in your OpenAI API Key on the **Settings** page, to use for querying.

4. Go to the [RagHost Playground Page](https://raghost.ai/playground) and embed a document by uploading a PDF.

5. Copy the `Collection ID`, go to the file `pages/index.tsx`, and edit this line:

   ```html
   <QueryBlock collectionId="clot64hmt0009nc23wo4w9y8h" />
   ```

   to be this, with your Collection ID:

   ```html
   <QueryBlock collectionId="your-collection-id" />
   ```

6. Install dependencies:

   ```bash
   yarn install
   ```

7. Start the server:

   ```bash
   yarn dev
   ```
