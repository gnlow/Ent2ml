fetch("https://playentry.org/graphql", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
        query: `
            query SELECT_PROJECTS(
                $query: String, 
                $categoryCode: String, 
                $staffPicked: Boolean, 
                $ranked: Boolean, 
                $parent: String, 
                $pageParam: PageParam, 
                $term: String, 
                $queryTitleOnly: Boolean
            ) {
                projectList(
                    query: $query
                    categoryCode: $categoryCode
                    staffPicked: $staffPicked
                    ranked: $ranked
                    parent: $parent
                    pageParam: $pageParam
                    term: $term
                    queryTitleOnly: $queryTitleOnly
                ) {
                    total
                    list {
                        user {
                            username
                            id
                        }
                    }
                }
            }
        `,
        operationName: "SELECT_PROJECTS",
        variables: {
            query: "",
            ranked: true,
            term: "all",
            pageParam: {
                start: 1,
                display: 1000,
                order: -1,
                sort: "created"
            },
            queryTitleOnly: false
        }
    })
})
.then(r => r.json())
.then(data => {
    let users = {}
    data.data.projectList.list.forEach(({user}) => {
        users[user.username] = user.id
    })
    console.log(data.data.projectList.list[0])
    console.log(users.dark)
    Deno.writeTextFile("./api/users.js", "export default " + JSON.stringify(users))
})