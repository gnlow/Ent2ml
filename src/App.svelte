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
    rank {
        position: absolute;
        top: 60px;
        left: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #E03997;
        width: 60px;
        height: 30px;
        border-radius: 15px;
        font-size: 22px;
    }
    value {
        margin-left: 30px;
    }
    item {
        position: relative;
        display: flex;
        align-items: center;
    }
    #visit {
        grid-area: visit;
    }
    #comment {
        grid-area: comment;
    }
    #like {
        grid-area: like;
    }
    #recentLike {
        grid-area: recentLike;
    }
    #staff {
        grid-area: staff;
    }
    img.profile {
        border-radius: 50%;
    }
</style>

<script lang="typescript">
import { onMount } from "svelte"
export let user

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
            <item id="visit">
                <img width="80" alt="visit" src="/img/visit.svg"/>
                <rank>#{user.visitRank}</rank>
                <value>{user.visitCount}</value>
            </item>
            <item id="comment">
                <img width="80" alt="comment" src="/img/comment.svg"/>
                <rank>#{user.commentRank}</rank>
                <value>{user.commentCount}</value>
            </item>
            <item id="like">
                <img width="80" alt="like" src="/img/like.svg"/>
                <rank>#{user.likeRank}</rank>
                <value>{user.likeCount}</value>
            </item>
            <item id="recentLike">
                <img width="80" alt="recentLike" src="/img/recentLike.svg"/>
                <rank>#{user.recentLikeRank}</rank>
                <value>{user.recentLikeCount}</value>
            </item>
            <item id="staff">
                <img width="80" alt="staff" src="/img/staff.svg"/>
                <rank>#{user.staffRank}</rank>
                <value>{user.staffCount}</value>
            </item>
        </scores>
    </box>
{/if}