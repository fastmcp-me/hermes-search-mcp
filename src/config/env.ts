"use strict";

export interface AzureSearchConfig {
  endpoint: string;
  apiKey: string;
  indexName: string;
}

export const getConfig = (): AzureSearchConfig => {
  const endpoint = process.env.AZURE_SEARCH_ENDPOINT;
  const apiKey = process.env.AZURE_SEARCH_API_KEY;
  const indexName = process.env.AZURE_SEARCH_INDEX_NAME;

  if (!endpoint || !apiKey || !indexName) {
    throw new Error("Missing required Azure Search configuration. Please check your .env file.");
  }

  return {
    endpoint,
    apiKey,
    indexName,
  };
}; 