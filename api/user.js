import { Application, helpers } from "https://deno.land/x/oak@v6.0.1/mod.ts"
const { getQuery } = helpers

import { getUserByUsername } from "https://raw.githubusercontent.com/gnlow/deno-playentry/main/mod.ts"

const getData = async () => {
    const [data, record] = await Promise.all([
        fetch("https://ent2ml-db.vercel.app/data.json").then(x => x.json()),
        fetch("https://ent2ml-db.vercel.app/record.json").then(x => x.json())
    ])
    return [data, record]
}

const getUser = async username => {
    const user = await getUserByUsername(username)
    if (user.id) {
        const [allData, staffData] = await Promise.all([
            user.findProjects(),
            user.findProjects({
                sort: "staffPicked"
            })
        ])
        const {visitCount, likeCount, recentLikeCount, commentCount} = allData.reduce((prev, curr) => {
            for (let key in prev) {
                prev[key] += curr[key]
            }
            return prev
        }, {
            visitCount: 0,
            likeCount: 0,
            recentLikeCount: 0,
            commentCount: 0,
        })
        return {
            username,
            id: user.id,
            staffCount: staffData.length,
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
        let [data, {dates, users}] = await getData()
        const basicInfo = 
            data.find(x => x.username == username) 
            || await getUser(username) 
            || {notUser: true}

        const toChartData = records => records?.map((record,i, l) => ({
            x: Number(dates[i + users[username].start]),
            y: l.slice(0, i + 1).reduce((prev, curr) => prev + curr, 0)
        }))
        const visitRecords = toChartData(users[username]?.visitRecords)
        const likeRecords = toChartData(users[username]?.likeRecords)
        ctx.response.body = {
            ...basicInfo,
            likeRecords,
            visitRecords,
        }
    } catch (e) {
        ctx.response.body = e.toString()
    }
})

export default app.handle