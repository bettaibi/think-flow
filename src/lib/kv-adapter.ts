// src/lib/kv-adapter.ts

import { getCloudflareContext } from "@opennextjs/cloudflare";

interface SecondaryStorage {
    /**
     *
     * @param key - Key to get
     * @returns - Value of the key
     */
    get: (key: string) => Promise<unknown> | unknown;
    set: (
    /**
     * Key to store
     */
    key: string, 
    /**
     * Value to store
     */
    value: string, 
    /**
     * Time to live in seconds
     */
    ttl?: number) => Promise<void | null | unknown> | void;
    /**
     *
     * @param key - Key to delete
     */
    delete: (key: string) => Promise<void | null | string> | void;
}

export async function cloudflareKVAdapter(): Promise<SecondaryStorage> {
  const {env} = await getCloudflareContext({async: true})
  return {
    async get(key) {
      const value = await env.THINK_FLOW_AUTH_SESSION.get(key, 'json');
      return value ?? null;
    },
    async set(key, value, ttl) {
      await env.THINK_FLOW_AUTH_SESSION.put(key, JSON.stringify(value), {
        expirationTtl: ttl,
      });
    },
    async delete(key) {
      await env.THINK_FLOW_AUTH_SESSION.delete(key);
    },
  };
}
