<script lang="ts">
  import { orderValue, searchValue } from "../stores";

  let searchStr = "";
  let orderStr = "idAsc";
  let typeStr = "";
  let timer;
  let isSearchErr = false;
  // let pokemonTypes = [
  //   { id: "0", text: "Normal" },
  //   { id: "1", text: "Fire" },
  //   { id: "2", text: "Water" },
  //   { id: "3", text: "Grass" },
  //   { id: "4", text: "Electric" },
  //   { id: "5", text: "Ice" },
  //   { id: "6", text: "Fighting" },
  //   { id: "7", text: "Poison" },
  //   { id: "8", text: "Ground" },
  //   { id: "9", text: "Flying" },
  //   { id: "10", text: "Psychic" },
  //   { id: "11", text: "Bug" },
  //   { id: "12", text: "Rock" },
  //   { id: "13", text: "Ghost" },
  //   { id: "14", text: "Dark" },
  //   { id: "15", text: "Dragon" },
  //   { id: "16", text: "Steel" },
  //   { id: "17", text: "Fairy" },
  // ];

  let pokemonTypes = [
    "Normal",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dark",
    "Dragon",
    "Steel",
    "Fairy",
  ];

  function search() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (searchStr.length >= 3 || searchStr.length == 0) {
        isSearchErr = false;
        searchValue.update(() => searchStr);
      } else {
        isSearchErr = true;
      }
    }, 500);
  }

  function order() {
    orderValue.update(() => orderStr);
  }

  // function typeSelect() {
  //   typeFilter.update((value) => typeStr);
  // }
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

    <p class="error-msg">
      {#if isSearchErr}
        <span> Type atleast 3 characters</span>
      {/if}
    </p>
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
  <!-- <div class="type-filter">
    <select
      name="typeDropdown"
      id="typeDropdown"
      bind:value={typeStr}
      on:change={typeSelect}
    >
      <option value="" disabled selected>Select pokemon type...</option>

      {#each pokemonTypes as type}
        <option value="type">{type}</option>
      {/each}
    </select>
  </div> -->
</div>

<style>
  .filter-container {
    width: 100%;
    display: flex;
    align-items: start;
    margin: 2rem;
    /* height: 15rem;
    min-height: 200px; */
  }

  .filter-container div {
    padding-right: 1rem;
  }

  .error-msg {
    color: #da1e28;
    position: absolute;
  }
</style>
