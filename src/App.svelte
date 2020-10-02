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
</style>

<script lang="typescript">

</script>

<box>
    <identity>
        <img alt="" src="https://playentry.org/uploads/profile/57/3f/avatar_573fa113b006225f746e3d4b.png?v=1601610575777"/>
        <nickname>
            dark
        </nickname>
    </identity>
    <scores>
        <item id="visit">
            <img width="80" alt="visit" src="/img/visit.svg"/>
            <rank>#4</rank>
            <value>709439</value>
        </item>
        <item id="comment">
            <img width="80" alt="comment" src="/img/comment.svg"/>
            <rank>#10</rank>
            <value>8181</value>
        </item>
        <item id="like">
            <img width="80" alt="like" src="/img/like.svg"/>
            <rank>#12</rank>
            <value>7937</value>
        </item>
        <item id="recentLike">
            <img width="80" alt="recentLike" src="/img/recentLike.svg"/>
            <rank>#99</rank>
            <value>9</value>
        </item>
        <item id="staff">
            <img width="80" alt="staff" src="/img/staff.svg"/>
            <rank>#10</rank>
            <value>6</value>
        </item>
    </scores>
</box>