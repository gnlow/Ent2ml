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
            myChart.options.scales.yAxes[0].ticks.fontColor = gradient
            myChart.update()
        }

    onMount(async () => {
        function withDate(records) {
            return records.map(record => {
                            record.x = new Date(Number(record.x))
                            return record
                        })
        }
        ctx = document.getElementById('lineChart').getContext('2d')
        myChart = new Chart(ctx, {
            type: "line",
            data: {
                datasets: [
                    {
                        label: "좋아요",
                        yAxisID: "like",
                        data: withDate(user.likeRecords),
                        borderColor: "white",
                        lineTension: 0,
                        fill: false,
                        asepectRatio: 2,
                    },
                    {
                        label: "조회수",
                        yAxisID: "visit",
                        data: withDate(user.visitRecords),
                        borderColor: "rgba(255, 255, 255, 0.6)",
                        lineTension: 0,
                        fill: false,
                        asepectRatio: 2,
                    },
                ]
            },
            options: {
                legend: {
                    labels: {
                        fontColor: "rgba(255, 255, 255, 0.8)"
                    }
                },
                scales: {
                    xAxes: [{
                        type: "time",
                        time: {
                            unit: "day",
                            displayFormats: {
                                day: "M/D"
                            },
                            tooltipFormat: "M/D"
                        },
                        ticks: {
                            fontColor: "rgba(255, 255, 255, 0.8)",
                            maxTicksLimit: 10
                        },
                        gridLines: {
                            color: "rgba(255, 255, 255, 0.1)"
                        }
                    }],
                    yAxes: [
                        {
                            id: "like",
                            type: "linear",
                            position: "left",
                            ticks: {
                                fontColor: "rgba(255, 255, 255, 0.8)",
                                stepSize: 100,
                                maxTicksLimit: 10,
                            },
                            gridLines: {
                                color: "rgba(255, 255, 255, 0.1)"
                            }
                        },
                        {
                            id: "visit",
                            type: "linear",
                            position: "right",
                            ticks: {
                                fontColor: "rgba(255, 255, 255, 0.6)",
                                stepSize: 1000,
                                maxTicksLimit: 10,
                            },
                            gridLines: {
                                color: "transparent"
                            }
                        }
                    ]
                }
            }
        })
    })
</script>

<box>
    <canvas id="lineChart"></canvas>
</box>