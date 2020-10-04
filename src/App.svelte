<style>
    box {
        display: flex;
        flex-direction: column;
        width: 800px;
        height: 400px;
        background: #242424;
        border-radius: 10px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        padding: 35px;
        box-sizing: border-box;
    }
    identity {
        display: flex;
        align-items: center;
        height: 120px;
    }
    identity img {
        height: 120px;
        width: 120px;
        border-radius: 50%;
    }
    identity nickname {
        font-size: 100px;
        font-weight: 800;
        margin-left: 20px;
    }
    scores {
        display: grid;
        height: 100%;
        grid-template:
            "visit visit visit comment comment comment"   50%
            "like like recentLike recentLike staff staff" 50%;
        font-size: 64px;
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
        font-size: 50px;
    }
</style>

<script lang="typescript">
import { onMount } from "svelte"
export let user

import Item from "./Item.svelte"

onMount(async () => {
    user = await fetch("/api/user").then(x => x.json())
})
</script>
{#if user}
    {#if !user.notUser}
        <box>
            <identity>
                <img alt="{user.username}" src="https://playentry.org/uploads/profile/{user.id.substring(0, 2)}/{user.id.substring(2, 4)}/avatar_{user.id}.png"/>
                <nickname>
                    {user.username}
                </nickname>
            </identity>
            <scores>
                <Item {user} icon="visit"/>
                <Item {user} icon="comment"/>
                <Item {user} icon="like"/>
                <Item {user} icon="recentLike"/>
                <Item {user} icon="staff"/>
            </scores>
        </box>
    {:else}
        <info>
            존재하지 않는 사용자입니다.<br/>
            ID를 올바르게 입력하셨는지 확인해주세요! :D
        </info>
        
    {/if}
{:else}
    <loader/>
{/if}