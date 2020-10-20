<style>
    :global(box) {
        background: #242424;
        border-radius: 10px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        margin: 10px;
        padding: 35px;
        box-sizing: border-box;
        max-width: 800px;
    }
    info {
        font-size: 24px;
    }
    loader-wrap {
        height: calc(100vh - 70px);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>

<script lang="typescript">
    import { onMount } from "svelte"

    export let username, user, boxSize, nicknameWidth
    import Profile from "./Profile.svelte"
    import Chart from "./Chart.svelte"
    import Timeline from "./Timeline.svelte"
    import Loader from "./Loader.svelte"

    function resize() {
        boxSize = Math.min(730, window.innerWidth - 90)
    }
    
    onMount(async () => {
        user = await fetch(`/api/user/${username}`).then(x => x.json())
        setTimeout(() => {
            resize()
            nicknameWidth = document.querySelector("nickname").offsetWidth
        }, 0)
    })
</script>

<svelte:window
    on:resize={resize}
/>

{#if user}
    {#if !user.notUser}
        <Profile {boxSize} {user} {nicknameWidth} />
        <Chart {user} />
        <Timeline {user} />
    {:else}
        <info>
            존재하지 않는 사용자입니다.<br/>
            ID를 올바르게 입력했는지 확인해주세요! :D
        </info>
        
    {/if}
{:else}
    <loader-wrap>
        <Loader/>
    </loader-wrap>
{/if}