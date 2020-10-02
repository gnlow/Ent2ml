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
    visit {
        grid-area: visit;
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
        <visit>
            709439
        </visit>
    </scores>
</box>