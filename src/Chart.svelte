<style>
    box {
        width: calc(100% - 20px);
        max-width: 800px;
    }
</style>

<script lang="typescript">
    export let user
    import { onMount } from "svelte"
    import Chart from "chart.js"
    import Vibrant from "../node_modules/node-vibrant/dist/vibrant.min.js"

    const getPalette = async () => {
        const colors = await Vibrant.from(`/api/pic/${user.id}`).getPalette()
        return [colors.Vibrant, colors.LightVibrant].map(x => {
            const [r, g, b] = x.getRgb()
            return `rgb(${r}, ${g}, ${b})`
        })
    }

    onMount(async () => {
        const ctx = document.getElementById('myChart').getContext('2d')
        const gradient = ctx.createLinearGradient(0, 0, 0, 400)
        const [color1, color2] = await getPalette()
        gradient.addColorStop(0, color1)
        gradient.addColorStop(1, color2)
        var myChart = new Chart(ctx, {
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
                    borderColor: gradient,
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