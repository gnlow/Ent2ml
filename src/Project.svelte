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
    img {
        border-radius: 5px;
        display: block;
        width: 100%;
    }
</style>

<script lang="typescript">
    export let project
</script>


<project>
    <project-date>
        {project.created.substring(0, 10)}
    </project-date>
    <project-name>
        {project.name}
    </project-name>
    <img alt="{project.name}" src="https://playentry.org/{project.thumb}"/>
</project>
