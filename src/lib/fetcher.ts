/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export interface FetcherOptions extends RequestInit {
  body?: any; // JSON or FormData, etc.
  params?: Record<string, string | number | boolean | undefined>;
  baseUrl?: string; 
}

export async function fetcher(
  endpoint: string,
  options: FetcherOptions = {}
): Promise<Response> {
  const { method = "GET", headers, body, params, ...rest } = options;

  try {

    const BASE_URL =
    options?.baseUrl ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "";

    let url = `${BASE_URL}${endpoint}`;
    if (params && Object.keys(params).length > 0) {
      const query = new URLSearchParams(
        Object.entries(params).filter(([_, v]) => v !== undefined) as [string, string][]
      ).toString();
      url += `?${query}`;
    }
    

    // Build request headers
    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
      ...headers,
    };

    // Handle JSON body automatically
    const fetchOptions: RequestInit = {
      method,
      headers: defaultHeaders,
      ...rest,
    };

    if (body) {
      fetchOptions.body =
        body instanceof FormData ? body : JSON.stringify(body);
      // Remove content-type if FormData (browser sets it automatically)
      if (body instanceof FormData) {
        delete (fetchOptions.headers as Record<string, string>)["Content-Type"];
      }
    }

    const res = await fetch(url, {
      ...fetchOptions,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Fetch error (${res.status}): ${errorText}`);
    }

    return res;
  } catch (error) {
    console.error("Fetcher error:", error);
    throw error;
  }
}
