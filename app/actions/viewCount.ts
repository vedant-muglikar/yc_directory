'use server';

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";

// Create read client
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// Create write client
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export async function getViewCount(id: string): Promise<number> {
  try {
    const result = await client
      .withConfig({ useCdn: true })
      .fetch(STARTUP_VIEWS_QUERY, { id });
    return result?.views || 0;
  } catch (error) {
    console.error('Error getting view count:', error);
    return 0;
  }
}

export async function incrementViewCount(id: string): Promise<number> {
  try {
    const result = await writeClient
      .patch(id)
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit({ autoGenerateArrayKeys: true });
    
    return result?.views || 0;
  } catch (error) {
    console.error('Error incrementing view count:', error);
    throw error;
  }
}
