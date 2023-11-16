# RagHost Example App

This example shows how to use the RagHost (raghost.ai) API to query some embedded documents.

- [🤔 What is RagHost?](#what-is-raghost)
- [🏁 Getting Started](#getting-started)

In this example, we have already uploaded 35 documents to RagHost using `/embed`, and this interface lets the user query the document collection.

<img width="947" alt="Screenshot 2023-11-11 at 5 51 33 PM" src="https://github.com/marissamarym/raghost-example/assets/1459660/5b59bcd4-3d6b-4e76-aa86-e2fcaffb930b">

# What is RagHost?

RagHost lets you rapidly build production-ready RAG (Retrieval-Augmented Generation) pipelines with an easy-to-use API.

You can embed documents using `/embed`, and query your document collections using `/query`.

# Getting Started

1. Copy the `.env.example` file.

   ```bash
   cp .env.example .env
   ```

2. Add your RagHost API key under `RAGHOST_API_KEY` to your `.env` file. You can get this API key from raghost.ai by signing up for an account and going to the **Settings** page.

3. Install dependencies:

   ```bash
   yarn install
   ```

5. Start the server:

   ```bash
   yarn dev
   ```
