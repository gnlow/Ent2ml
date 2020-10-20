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

    onMount(async () => {
        var ctx = document.getElementById('myChart').getContext('2d');
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
                    borderColor: "rgba(255, 255, 255, 1)",
                    fill: false
                }]
            }
        })
    })
</script>

<box>
    <canvas id="myChart" width="400" height="400"></canvas>
</box>