"use strict";

import { z } from "zod";
import { searchDocuments, indexContent, deleteIndex } from "../tools/search-tools";
import { ToolConfig } from "../types/tools";

export const tools: ToolConfig[] = [
  {
    name: "search-documents",
    description: "Search documents in Azure Cognitive Search index",
    parameters: z.object({
      query: z.string().describe("The search query to execute"),
      top: z.number().optional().describe("Number of results to return (default: 5)"),
      filter: z.string().optional().describe("OData filter expression"),
      select: z.array(z.string()).optional().describe("Fields to include in the results"),
    }),
    execute: async (args) => {
      return await searchDocuments(args.query, {
        top: args.top,
        filter: args.filter,
        select: args.select,
      });
    },
  },
  {
    name: "index-content",
    description: "Index or update documents in Azure Cognitive Search",
    parameters: z.object({
      documents: z.array(z.any()).describe("Array of documents to index"),
    }),
    execute: async (args) => {
      return await indexContent(args.documents);
    },
  },
  {
    name: "delete-index",
    description: "Delete the Azure Cognitive Search index",
    parameters: z.object({}),
    execute: async () => {
      return await deleteIndex();
    },
  },
]; 