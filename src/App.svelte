<script>
  import Home from "@/components/Home.svelte";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  let name = "World";
  let show = true;

  onMount(() => {
    setTimeout(() => {
      show = false;
    }, 5600);
  });
</script>

{#if show}
  <Home />
{:else}
  <main transition:fade>
    <h1>Hello {name}!</h1>
    <p>
      Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
      how to build Svelte apps.
    </p>
  </main>
{/if}

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
