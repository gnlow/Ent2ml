import { ServerRequest } from "https://deno.land/std/http/server.ts"

export default async (req: ServerRequest) => {
    req.respond({body: "Hello, World!"})
}