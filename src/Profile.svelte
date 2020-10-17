<style>
    box {
        display: flex;
        flex-direction: column;
        max-width: 800px;
        min-height: 400px;
        position: relative;
    }
    identity {
        display: flex;
        align-items: center;
    }
    identity img {
        width: auto;
        height: auto;
        max-width: 120px;
        max-height: 120px;
        border-radius: 50%;
    }
    identity nickname {
        font-size: 100px;
        font-weight: 800;
        margin-left: 20px;
    }
    scores {
        display: flex;
        flex-wrap: wrap;
        justify-content: stretch;
        height: 100%;
        font-size: 64px;
    }
    img[alt="ent2.ml"] {
        position: absolute;
        height: 30px;
        bottom: 10px;
        right: 10px;
    }
</style>

<script lang="typescript">
    import { onMount } from "svelte"
    export let user, nicknameWidth, boxSize

    import Item from "./Item.svelte"

    function resize(event) {
        boxSize = window.innerWidth - 90
    }
    function fitTo(originWidth, originSize, width) {
        return Math.min(originSize, width / originWidth * originSize)
    }
</script>

<svelte:window
    on:resize={resize}
/>
<box>
    <img alt="ent2.ml" src="/img/logo_text.png"/>
    <identity>
        <img width="120" height="120" alt="{user.username}" title="{user.username}" src="https://playentry.org/uploads/profile/{user.id.substring(0, 2)}/{user.id.substring(2, 4)}/avatar_{user.id}.png"/>
        <nickname
            style="font-size: {nicknameWidth ? fitTo(nicknameWidth, 100, boxSize - 140) : 100}px"
        >
            {user.username}
        </nickname>
    </identity>
    <scores>
        <Item {user} icon="visit"      title="조회수"        />
        <Item {user} icon="comment"    title="받은 댓글"      />
        <Item {user} icon="like"       title="받은 좋아요"    />
        <Item {user} icon="recentLike" title="최근 받은 좋아요"/>
        <Item {user} icon="staff"      title="스태프 선정"    />
    </scores>
</box>