import { Application, helpers } from "https://deno.land/x/oak@v6.0.1/mod.ts"
const { getQuery } = helpers
import users from "./users.js"

const app = new Application

app.use(async ctx => {
    const username = getQuery(ctx).username

    ctx.response.body = users[username] || "not_found"
})

export default app.handle