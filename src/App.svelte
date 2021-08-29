<script lang="ts">
  import Filter from "./Filter.svelte";
  import Header from "./Header.svelte";

  import PokeList from "./PokeList.svelte";
  import Sidebar from "./Sidebar.svelte";
</script>

<Header />

<div class="data-container">
  <!-- <div>
    <Sidebar />
  </div> -->
  <div>
    <Filter />

    <PokeList />
  </div>
</div>

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
