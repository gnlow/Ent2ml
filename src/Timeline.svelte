<style>
</style>

<script lang="typescript">
    export let user, projects
    import { onMount } from "svelte"
    import fetchJsonp from "fetch-jsonp"

    const urlWithQuery = (urlString, params) => {
        const url = new URL(urlString)
        url.search = new URLSearchParams(params).toString()
        return url.toString()
    }

    onMount(async () => {
        const res = await fetchJsonp(
            urlWithQuery(
                "https://playentry.org/api/project/find",
                {
                    user: user.id,
                    rows: 1,
                    noCache: Date.now(),
                    sort: "likeCnt",
                }
            )
        ).then(x => x.json())
        projects = (await Promise.all(res.data.map(async ({_id}) => {
            return await fetchJsonp(`https://playentry.org/api/project/${_id}`).then(x => x.json())
        }))).sort((a, b) => a.created > b.created ? 1 : -1 )
        console.log(projects)
    })
</script>

<box>
    {#if projects}
        <ul>
            {#each projects as project}
                <li>
                    {project.name}
                </li>
            {/each}
        </ul>
        
    {:else}
        loading
    {/if}
</box>