"use strict";

import { SearchClient, SearchIndexClient, AzureKeyCredential } from "@azure/search-documents";
import { getConfig } from "../config/env";

const config = getConfig();
const searchClient = new SearchClient(
  config.endpoint,
  config.indexName,
  new AzureKeyCredential(config.apiKey)
);

const indexClient = new SearchIndexClient(
  config.endpoint,
  new AzureKeyCredential(config.apiKey)
);

export const searchDocuments = async (query: string, options?: {
  top?: number;
  filter?: string;
  select?: string[];
}) => {
  try {
    const results = await searchClient.search(query, {
      top: options?.top || 5,
      filter: options?.filter,
      select: options?.select,
    });

    const documents = [];
    for await (const result of results.results) {
      documents.push(result.document);
    }

    return JSON.stringify(documents);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Search failed: ${error.message}`);
    }
    throw new Error("Search failed with unknown error");
  }
};

export const indexContent = async (documents: any[]) => {
  try {
    const result = await searchClient.mergeOrUploadDocuments(documents);
    return JSON.stringify(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Indexing failed: ${error.message}`);
    }
    throw new Error("Indexing failed with unknown error");
  }
};

export const deleteIndex = async () => {
  try {
    await indexClient.deleteIndex(config.indexName);
    return "Index deleted successfully";
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Index deletion failed: ${error.message}`);
    }
    throw new Error("Index deletion failed with unknown error");
  }
}; 