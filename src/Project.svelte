<style>
    project {
        position: relative;
        display: block;
    }
    project-date {
        font-size: 48px;
    }
    project-name {
        position: absolute;
        left: 5px;
        bottom: 5px;
        padding: 0px 5px;
        background: #242424EE;
        font-weight: 300;
        font-size: 32px;
        overflow: hidden; 
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: calc(100% - 20px);
    }
    project-thumb {
        display: block;
        position: relative;
    }
    img {
        border-radius: 5px;
        display: block;
        width: 100%;
        max-width: 400px;
    }
    project-badge {
        position: absolute;
        top: 0;
        right: 0;
        width: 100px;
        height: 100px;
    }
</style>

<script lang="typescript">
    export let project
    import Badge from "./Badge.svelte"
</script>


<project>
    <project-date>
        {project.created.substring(0, 10)}
    </project-date>
    <project-thumb>
        <a href="https://playentry.org/{project.user.username}/{project._id}">
            <img alt="{project.name}" src="https://playentry.org/{project.thumb}"/>
        </a>
        <project-badge>
            {#if project.isStaff}
                <Badge/>
            {/if}
        </project-badge>
    </project-thumb>
    <project-name>
        {project.name}
    </project-name>
</project>
