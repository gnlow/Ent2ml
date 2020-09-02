import { Application, helpers } from "https://deno.land/x/oak@v6.0.1/mod.ts"
const { getQuery } = helpers

const app = new Application

app.use(async ctx => {
    try {
        const { sortBy } = getQuery(ctx)
        const sortByKey = {
            visit: "visitCount",
            like: "likeCount",
            recentLike: "recentLikeCount",
            staff: "staffCount",
            comment: "commentCount"
        }[sortBy] || "visitCount"

        const staffPicks = await fetch("https://playentry.org/api/rankProject?type=staff&limit=0").then(x => x.json())
        let users = new Map()
        staffPicks.forEach(({project}) => {
            const username = project?.user?.username
            if (username) {
                users.set(
                    username,
                    [
                        project.user._id,
                        (users.get(username)?.[1] || 0) + 1,
                    ]
                )
            }
        })
        ctx.response.body = (await Promise.all(Array.from(users.entries())
            .map(async ([username, [id, count]]) => {
                const [allData, staffData] = await Promise.all([
                    fetch(`https://playentry.org/api/project/find?&rows=0&tab=my_project&type=project&searching=true&user=${id}&blamed=false`).then(x => x.json()),
                    fetch(`https://playentry.org/api/project/find?&sort=staffPicked&tab=my_project&type=project&searching=true&user=${id}&blamed=false`).then(x => x.json())
                ])

                const {visitCount, likeCount, recentLikeCount, commentCount} = allData.data.reduce(({visitCount, likeCount, recentLikeCount, commentCount}, {visit, likeCnt, recentLikeCnt, comment}) => {
                    visitCount += visit
                    likeCount += likeCnt
                    recentLikeCount += recentLikeCnt
                    commentCount += comment
                    return {visitCount, likeCount, recentLikeCount, commentCount}
                }, {
                    visitCount: 0,
                    likeCount: 0,
                    recentLikeCount: 0,
                    commentCount: 0,
                })

                return {
                    username,
                    id,
                    staffCount: Math.max(
                        count,
                        staffData.data.length
                    ),
                    visitCount,
                    likeCount,
                    recentLikeCount,
                    commentCount,
                }
            })))
            .sort((a, b) => b[sortByKey] - a[sortByKey])
    } catch (e) {
        ctx.response.body = e.toString()
    }
})

export default app.handle