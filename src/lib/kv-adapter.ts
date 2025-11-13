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
    ttl?: number
  ) => Promise<void | null | unknown> | void;
  /**
   *
   * @param key - Key to delete
   */
  delete: (key: string) => Promise<void | null | string> | void;
}

export async function cloudflareKVAdapter(): Promise<SecondaryStorage> {
  const { env } = await getCloudflareContext({ async: true });
  const kv = env.THINK_FLOW_AUTH_SESSION;

  return {
    async get(key) {
      console.log("Getting from KV: ", key);
      const value = await kv.get(key, "json");
      return value ?? null;
    },
    async set(key, value, ttl) {
      console.log("Setting to KV: ", key);
      await kv.put(key, JSON.stringify(value), {
        expirationTtl: ttl,
      });
    },
    async delete(key) {
      console.log("Deleting from KV: ", key);
      await kv.delete(key);
    },
  };
}
