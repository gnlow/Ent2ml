<style>
    box {
        width: calc(100% - 20px);
        max-width: 800px;
    }
</style>

<script lang="typescript">
    export let user, colors, ctx, myChart
    import { onMount } from "svelte"
    import Chart from "chart.js"

    $: if (colors) {
            const gradient = ctx.createLinearGradient(0, 0, 0, 400)
            gradient.addColorStop(0, colors[0])
            gradient.addColorStop(1, colors[1])
            myChart.data.datasets[0].borderColor = gradient
            myChart.update()
        }

    onMount(async () => {
        ctx = document.getElementById('myChart').getContext('2d')
        myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: user.record.map(({x}) => {
                    const date = new Date(x)
                    const unOffset = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
                    return unOffset.toISOString().split("T")[0]
                }),
                datasets: [{
                    label: "좋아요",
                    data: user.record,
                    borderColor: "white",
                    lineTension: 0,
                    fill: false,
                    asepectRatio: 2,
                }]
            },
            options: {
                lengend: {
                    labels: {
                        fontColor: "rgba(255, 255, 255, 0.8)"
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontColor: "rgba(255, 255, 255, 0.8)"
                        },
                        gridLines: {
                            color: "rgba(255, 255, 255, 0.1)"
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            fontColor: "rgba(255, 255, 255, 0.8)"
                        },
                        gridLines: {
                            color: "rgba(255, 255, 255, 0.1)"
                        }
                    }]
                }
            }
        })
    })
</script>

<box>
    <canvas id="myChart"></canvas>
</box>