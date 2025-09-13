import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, token } from "../env";

// Create a write client for server-side operations
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

// Throw an error if the write token is not found
if (!token) {
  throw new Error("SANITY_API_WRITE_TOKEN environment variable is not set");
}
