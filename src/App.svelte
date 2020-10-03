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
        color: white;
    }
    identity {
        display: flex;
        align-items: center;
        height: 120px;
    }
    identity img {
        height: 100%;
    }
    identity nickname {
        color: white;
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
    img.profile {
        border-radius: 50%;
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
    <box>
        <identity>
            <img class="profile" alt="{user.id}" src="https://playentry.org/uploads/profile/{user.id.substring(0, 2)}/{user.id.substring(2, 4)}/avatar_{user.id}.png"/>
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
{/if}