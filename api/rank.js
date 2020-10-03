import { Application, helpers } from "https://deno.land/x/oak@v6.0.1/mod.ts"
const { getQuery } = helpers

const getData = async () => {
    return JSON.parse(await fetch("https://ent2ml-db.vercel.app/data.json").then(x => x.text()))
}

const app = new Application

app.use(async ctx => {
    try {
        const { sortBy, limit } = getQuery(ctx)
        const sortByKey = {
            visit: "visitCount",
            like: "likeCount",
            recentLike: "recentLikeCount",
            staff: "staffCount",
            comment: "commentCount"
        }[sortBy]

        let data = await getData()
        if (sortByKey) {
            data = data.sort((a, b) => b[sortByKey] - a[sortByKey])
        }
        ctx.response.body = data.slice(0, limit && Number(limit))
    } catch (e) {
        ctx.response.body = e.toString()
    }
})

export default app.handle