<script lang="ts">
  import { onMount } from "svelte";

  import Filter from "./views/Filter.svelte";
  import Header from "./views/Header.svelte";
  import Footer from "./views/Footer.svelte";
  import PokeList from "./views/PokeList.svelte";

  import { pageOptions } from "./stores";
</script>

<Header />

<div class="data-container">
  <div>
    <Filter />

    <PokeList pageOpt={$pageOptions} />
  </div>
</div>

<Footer />

<style>
  @import url("https://fonts.googleapis.com/css2?family=Epilogue:wght@400;600&display=swap");

  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    margin: 0px;
    padding: 0px;
    font-family: "Epilogue", sans-serif;
  }

  :global(input, select) {
    border-radius: 4px;
    padding: 0.6em;
    font-size: 1.2rem;
  }

  :global(select option) {
    line-height: 1em;
    padding: 0.6em;
    font-size: 1.2rem;
  }

  .data-container {
    display: grid;
    grid-template-columns: 100%;
    justify-items: center;
  }
</style>
