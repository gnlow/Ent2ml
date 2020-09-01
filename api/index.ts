import { Application, helpers } from "https://deno.land/x/oak@v6.0.1/mod.ts"
const { getQuery } = helpers

const app = new Application

app.use(ctx => {
    ctx.response.body = getQuery(ctx)
})

export default app.handle