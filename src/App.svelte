<style>
    :global(box) {
        background: #242424;
        border-radius: 10px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        margin: 10px;
        padding: 35px;
        box-sizing: border-box;
        max-width: 800px;
    }
    info {
        font-size: 24px;
    }
    center-wrap {
        height: calc(100vh - 70px);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>

<script lang="typescript">
    import { onMount } from "svelte"

    export let username, user, boxSize, nicknameWidth, colors, error
    import Profile from "./Profile.svelte"
    import LineChart from "./LineChart.svelte"
    import PieChart from "./PieChart.svelte"
    import Timeline from "./Timeline.svelte"
    import Loader from "./Loader.svelte"
    
    import Vibrant from "../node_modules/node-vibrant/dist/vibrant.min.js"

    import Chart from "chart.js"
    import DataLabels from "chartjs-plugin-datalabels"
    Chart.plugins.unregister(DataLabels)
    
    const getPalette = async () => {
        const colors = await Vibrant.from(`/api/pic/${user.id}`).getPalette()
        return [colors.LightVibrant, colors.Vibrant, colors.DarkVibrant].map(x => {
            const [r, g, b] = x.getRgb()
            return `rgb(${r}, ${g}, ${b})`
        })
    }

    function resize() {
        boxSize = Math.min(730, window.innerWidth - 90)
    }
    
    const main = async () => {
            user = await fetch(`/api/user/${username}`).then(x => x.json())
            setTimeout(() => {
                resize()
                nicknameWidth = document.querySelector("nickname").offsetWidth
            }, 0)
            colors = await getPalette()
            const css = document.styleSheets[0]
            css.insertRule(`
                .colored {
                    background: linear-gradient(
                        to right bottom,
                        ${colors[0]},
                        ${colors[1]}
                    ) fixed;
                }
            `, css.cssRules.length)
            css.insertRule(`
                .hide {
                    opacity: 0;
                }
            `, css.cssRules.length)
            document.querySelector("body").classList.add("colored")
            document.querySelector("bg-gradient").classList.add("hide")
        }
    
    
    onMount(async () => {
        try {
            await main().catch(e => {
                throw e
            })
        } catch (e) {
            error = e
        }
    })
    
</script>

<svelte:window
    on:resize={resize}
/>

{#if error}
    <center-wrap>    
        <info>
            오류가 발생했습니다. :(<br/>
            새로고침해도 계속 같은 오류가 발생하면<br/>
            이 화면을 캡쳐해서<br/>
            <a href="https://github.com/gnlow/Ent2ml/issues">Issue 페이지</a>에 올려주세요.<br/>
            <br/>
            <code>{error}</code>
        </info>
    </center-wrap>
{:else if user}
    {#if !user.notUser}
        <Profile {boxSize} {user} {nicknameWidth} />
        {#if !user.unranked}
            <LineChart {user} {colors} />
        {/if}
        {#if user.projects.length}
            {#if user.projects.length > 1}
                <PieChart {user} {colors} />
            {/if}
            <Timeline {user} />
        {/if}
    {:else}
        <center-wrap>
            <info>
                존재하지 않는 사용자입니다.<br/>
                ID를 올바르게 입력했는지 확인해주세요! :D
            </info>
        </center-wrap>
    {/if}
{:else}
    <center-wrap>
        <Loader/>
    </center-wrap>
{/if}