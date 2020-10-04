<style>
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
</style>

<script lang="typescript">
    export let icon, user, title
</script>

<item style="grid-area: {icon}">
    <img {title} width="80" alt="{icon}" src="/img/{icon}.svg"/>
    {#if user[`${icon}Rank`] < 100}
        <rank title="{title} {user[`${icon}Rank`]}위">#{user[`${icon}Rank`]}</rank>
    {/if}
    <value>{user[`${icon}Count`]}</value>
</item>