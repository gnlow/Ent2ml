<style>
    :global(box) {
        background: #242424;
        border-radius: 10px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        margin: 10px;
        padding: 35px;
        box-sizing: border-box;
    }
    loader {
        border: 16px solid #242424;
        border-top: 16px solid white;
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
    }
    @keyframes spin {
        100% { transform: rotate(360deg); }
    }
    info {
        font-size: 24px;
    }
</style>

<script lang="typescript">
    import { onMount } from "svelte"

    export let username, user, nicknameWidth
    import Profile from "./Profile.svelte"

    
    onMount(async () => {
        user = await fetch(`/api/user/${username}`).then(x => x.json())
        setTimeout(() => {
            nicknameWidth = document.querySelector("nickname").offsetWidth
        }, 0)
    })
</script>
{#if user}
    {#if !user.notUser}
        <Profile {user} {nicknameWidth} />
    {:else}
        <info>
            존재하지 않는 사용자입니다.<br/>
            ID를 올바르게 입력했는지 확인해주세요! :D
        </info>
        
    {/if}
{:else}
    <loader/>
{/if}