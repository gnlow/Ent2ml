import { Application, helpers } from "https://deno.land/x/oak@v6.0.1/mod.ts"
const { getQuery } = helpers

const getData = async () => {
    return JSON.parse(await fetch("https://ent2ml-db.vercel.app/data.json").then(x => x.text()))
}

const getUser = async username => {
    const id = (await fetch(`https://playentry.org/api/getUserByUsername/${username}`).then(x => x.json()))?._id
    if (id) {
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
            staffCount: staffData.data.length,
            visitCount,
            likeCount,
            recentLikeCount,
            commentCount,
            unranked: true,
        }
    }
}

const app = new Application

app.use(async ctx => {
    try {
        const username = getQuery(ctx).username
        let data = await getData()
        ctx.response.body = 
            data.find(x => x.username == username) 
            || await getUser(username) 
            || {notUser: true}
    } catch (e) {
        ctx.response.body = e.toString()
    }
})

export default app.handle