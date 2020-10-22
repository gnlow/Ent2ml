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
        ctx = document.getElementById('pieChart').getContext('2d')
        myChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: [1,2,3],
                datasets: [{
                    data: [4,5,6]
                }]
            },
            options: {
                
            }
        })
    })
</script>

<box>
    <canvas id="pieChart"></canvas>
</box>