<style>
    box {
        width: calc(100% - 20px);
        max-width: 800px;
        display: flex;
    }
    timeline-line {
        width: 5px;
        border-radius: 2.5px;
        background: white;
        margin: 0 35px 0 0;
    }
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        flex-grow: 1;
    }
    li {
        position: relative;
    }
    timeline-badge {
        position: absolute;
        width: 15px;
        height: 15px;
        border-radius: 7.5px;
        background: white;
        left: -45px;
        top: 30px;
    }
</style>

<script lang="typescript">
    export let user, projects, staffPicked
    import { onMount } from "svelte"
    import fetchJsonp from "fetch-jsonp"
    import Project from "./Project.svelte"

    const urlWithQuery = (urlString, params) => {
        const url = new URL(urlString)
        url.search = new URLSearchParams(params).toString()
        return url.toString()
    }

    const findProject = async option => {
        return await fetchJsonp(
            urlWithQuery(
                "https://playentry.org/api/project/find",
                {
                    user: user.id,
                    noCache: Date.now(),
                    ...option
                }
            )
        ).then(x => x.json())
    }
    onMount(async () => {
        const [res1, res2] = await Promise.all([
            findProject({
                rows: 1,
                sort: "likeCnt",
            }),
            findProject({
                rows: 0,
                sort: "staffPicked",
            })
        ])
        projects = (await Promise.all(res1.data.map(async ({_id}) => {
            return await fetchJsonp(`https://playentry.org/api/project/${_id}`).then(x => x.json())
        }))).sort((a, b) => a.created < b.created ? 1 : -1 )

        staffPicked = res2.data.map(({_id}) => _id)

        console.log(projects)
    })
</script>

<box>
    {#if projects}
        <timeline-line/>
        <ul>
            {#each projects as project}
                <li>
                    <timeline-badge/>
                    <Project {project} isStaff={staffPicked.includes(project._id)}/>
                </li>
            {/each}
        </ul>
        
    {:else}
        loading
    {/if}
</box>