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
    loader-wrap {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>

<script lang="typescript">
    export let user, projects
    import { onMount } from "svelte"
    import fetchJsonp from "fetch-jsonp"
    import Loader from "./Loader.svelte"
    import Project from "./Project.svelte"

    onMount(async () => {
        projects = (await Promise.all(user.projects.slice(0, 10).map(async ({id, isStaff}) => {
            return {
                ...(await fetchJsonp(`https://playentry.org/api/project/${id}`).then(x => x.json())),
                isStaff
            }
        }))).sort((a, b) => a.created < b.created ? 1 : -1 )
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
                    <Project {project}/>
                </li>
            {/each}
        </ul>
        
    {:else}
        <loader-wrap>
            <Loader/>
        </loader-wrap>
    {/if}
</box>