<style>
    box {
        width: calc(100% - 20px);
        max-width: 800px;
    }
</style>

<script lang="typescript">
    export let user, colors, canvas, ctx, myChart, projects
    import { onMount } from "svelte"
    import Chart from "chart.js"

    import DataLabels from "chartjs-plugin-datalabels"

    Chart.plugins.unregister(DataLabels)

    $: if (colors) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400)
        gradient.addColorStop(0, colors[0])
        gradient.addColorStop(1, colors[1])
        myChart.data.datasets[0].backgroundColor = projects.fill(gradient)
        myChart.update()
    }

    onMount(async () => {
        const sortedProjects = user.projects.sort((a, b) => b.likeCount - a.likeCount)
        const restPoint = sortedProjects.findIndex(({likeCount}) => likeCount < user.likeCount / 100 * 2)
        projects = [
            ...sortedProjects.slice(0, restPoint),
            sortedProjects
                .slice(restPoint)
                .reduce((prev, {likeCount}) => {
                    prev.likeCount += likeCount
                    return prev
                }, {
                    name: "나머지",
                    likeCount: 0
                })
        ]
        canvas = document.getElementById('pieChart')
        ctx = canvas.getContext('2d')
        myChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: projects.map(({name}) => name),
                datasets: [{
                    data: projects.map(({likeCount}) => likeCount),
                    backgroundColor: "white",
                    borderColor: "#242424"
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "작품별 좋아요 수",
                    fontColor: "white",
                    fontSize: 24,
                },
                legend: {
                    display: false
                },
                plugins: {
                    datalabels: {
                        formatter(val, context) {
                            return context.chart.data.labels[context.dataIndex]
                        },
                        color: "white",
                        backgroundColor: "#242424",
                        anchor: "end",
                        align: "end",
                    }
                }
            },
            plugins: [DataLabels]
        })
    })
</script>

<box>
    <canvas id="pieChart"></canvas>
</box>