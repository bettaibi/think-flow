
### create KV bindings via the CLI

```sh
npx wrangler kv namespace create "BINDING_NAME"
```

### Check in Local KV

```sh
npx wrangler kv key list --namespace-id <your-namespace-id>
```

### D1 Migration
```sh
npx wrangler d1 migrations apply DB_BINDING_NAME
```


### Cache Route handlers

1. #####  Use Cache Control
```ts
 return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=300", // cache 5m at CDN edge
      },
    });
```

2. ##### Use cloudflare cache API