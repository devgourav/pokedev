<script lang="ts">
  import { searchValue, orderValue } from "./stores";

  let searchStr = "";
  let orderStr = "idAsc";

  function search() {
    searchValue.update((value) => searchStr);
  }

  function order() {
    orderValue.update((value) => orderStr);
  }
</script>

<div class="filter-container">
  <div class="search-container">
    <input
      id="searchpoke"
      bind:value={searchStr}
      type="text"
      placeholder="Search By Name..."
      on:input={search}
    />
  </div>
  <div class="data-dropdown">
    <select
      name="dropdown"
      id="dropdown"
      bind:value={orderStr}
      on:change={order}
    >
      <option value="idAsc">By Id Ascending</option>
      <option value="idDesc">By Id Descending</option>
      <option value="nameAsc">By Name Ascending(A-Z)</option>
      <option value="nameDesc">By Name Descending(Z-A)</option>
    </select>
  </div>
</div>

<style>
  .filter-container {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 2rem;
    /* height: 15rem;
    min-height: 200px; */
  }

  .filter-container div {
    padding-right: 1rem;
  }
</style>
