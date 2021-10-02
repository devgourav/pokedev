<script lang="ts">
  import { PokemonService } from "../pokemonService";
  import type { Pokemon } from "../pokemon.model";
  import { onMount } from "svelte";
  import localForage from "localforage";
  import PokeCard from "./PokeCard.svelte";
  import {
    searchValue,
    orderValue,
    totalItemCount,
    pageSelected,
    modalPokemonName,
  } from "../stores";
  import Pagination from "./Pagination.svelte";
  import PokeModal from "./PokeModal.svelte";
  import { fade, fly, scale } from "svelte/transition";
  import Loader from "./Loader.svelte";

  let ps = new PokemonService();
  let pokemons: Pokemon[] = [];
  let searchStr;
  let orderStr;
  export let pageOpt;
  const POKEMON_LIMIT = 898;
  let pokeNames = [];
  let isOrderFilter = false;
  let isSearchFilter = false;
  let filterList = [];
  let orderList = [];
  let isShowModal = false;
  let modalPokemon: Pokemon;

  let isPokemonLoading = false;

  const whenPageClick = (event) =>
    getPokemonListPerPage(event.detail.selectedPage);

  onMount(() => {
    console.log("🚀 ~ file: PokeList.svelte ~ line 22 ~ pageOpt", pageOpt);
    fetchPokemonList(POKEMON_LIMIT);
    pageSelected.update((value) => 1);
  });

  searchValue.subscribe((value) => {
    searchStr = value;
    if (searchStr && searchStr.length > 2) {
      isSearchFilter = true;
      filterList = pokeNames.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchStr.toLowerCase())
      );
      loadPokemonDetails(filterList);
    } else {
      isSearchFilter = false;
      getPokemonListPerPage(0);
    }
  });

  orderValue.subscribe((value) => {
    console.log(
      "🚀 ~ file: PokeList.svelte ~ line 46 ~ orderValue.subscribe ~ value",
      value
    );
    orderStr = value;

    if (orderStr && orderStr !== "idAsc") {
      isOrderFilter = true;
    }

    switch (orderStr) {
      case "idAsc":
        orderList = pokeNames.sort((a, b) => (a.id < b.id ? -1 : 1));
        break;

      case "idDesc":
        orderList = pokeNames.sort((a, b) => (a.id > b.id ? -1 : 1));
        break;

      case "nameAsc":
        orderList = pokeNames.sort((a, b) => (a.name < b.name ? -1 : 1));
        break;

      case "nameDesc":
        orderList = pokeNames.sort((a, b) => (a.name > b.name ? -1 : 1));
        break;

      default:
        break;
    }

    getPokemonListPerPage(0);
  });

  function fetchPokemonList(limit: number) {
    ps.getPokemonNameList(limit).then((res) => {
      console.log(
        "🚀 ~ file: PokeList.svelte ~ line 95 ~ ps.getPokemonNameList ~ res",
        res
      );
      console.log(
        "🚀 ~ file: PokeList.svelte ~ line 65 ~ ps.getPokemonNameList ~ res",
        res.results.length
      );
      totalItemCount.update((value) => res.results.length);
      pokeNames = res.results.map((ele, index) => {
        return { name: ele.name, id: index + 1 };
      });

      localForage.setItem("pokemon_list", res);

      getPokemonListPerPage(0);
    });
  }

  function getPokemonListPerPage(pageNo: number) {
    isPokemonLoading = true;
    let startIndex = 0;

    if (pageNo > 1) {
      startIndex = (pageNo - 1) * pageOpt.itemsInPage;
    }

    let initialList = [];

    if (isOrderFilter) {
      console.log(
        "🚀 ~ file: PokeList.svelte ~ line 108 ~ getPokemonListPerPage ~ orderList",
        orderList
      );

      initialList = orderList.slice(
        startIndex,
        startIndex + pageOpt.itemsInPage
      );
    } else {
      initialList = pokeNames.slice(
        startIndex,
        startIndex + pageOpt.itemsInPage
      );
    }

    console.log(
      "🚀 ~ file: PokeList.svelte ~ line 112 ~ getPokemonListPerPage ~ initialList",
      initialList
    );

    loadPokemonDetails(initialList);
  }

  function loadPokemonDetails(pokeNameList) {
    getPokemonData(pokeNameList).then((res) => {
      pokemons = res.map((ele: any) => {
        localForage.setItem("pokemon_" + ele.name, ele);
        return pokemonAdapter(ele);
      });

      isPokemonLoading = false;
    });
  }

  async function getPokemonData(pokeNameList) {
    const pokes = await Promise.all(
      pokeNameList.map((pokeName) => {
        return ps.getPokemonByName(pokeName.name);
      })
    );
    return pokes;
  }

  function pokemonAdapter(ele): Pokemon {
    let pokemon: Pokemon = {
      id: ele.id,
      name: ele.name,
      height: ele.height,
      weight: ele.weight,
      frontImage: ele.sprites.front_default,
      types: ele.types.map((type) => type.type.name),
      abilities: ele.abilities.map((ability) => ability.ability.name),
      base_experience: ele.base_experience,
      moves: ele.moves.map((move) => move.move.name),
      species: ele.species,
      stats: ele.stats.map((stat) => {
        return { name: stat.stat.name, base_stat: stat.base_stat };
      }),
    };

    return pokemon;
  }

  const modalOpen = (event) => {
    modalPokemon = pokemons.find((ele) => ele.id == event.detail.id);
    console.log(
      "🚀 ~ file: PokeList.svelte ~ line 192 ~ modalOpen ~ modalPokemon",
      modalPokemon
    );
    isShowModal = true;
  };

  const getFamily = (event) => {
    console.log(
      "🚀 ~ file: PokeList.svelte ~ line 204 ~ getFamily ~ event",
      event
    );

    modalPokemon = pokemons.find(
      (ele: Pokemon) => ele.name == event.detail.name
    );

    isShowModal = true;

    modalPokemonName.update((value) => modalPokemon);
  };
</script>

{#if isShowModal}
  <div in:fade out:fade>
    <PokeModal
      {modalPokemon}
      on:modalClose={() => (isShowModal = false)}
      on:sendFamily={getFamily}
    />
  </div>
{/if}

<div class="showing-text">
  {#if isSearchFilter == true}
    <p>Showing {filterList.length} pokemons</p>
  {:else}
    <p>Showing {pokeNames.length} pokemons</p>
  {/if}
</div>

{#if !isPokemonLoading}
  <div class="list-container">
    {#each pokemons as pokemon}
      <PokeCard {pokemon} on:modalOpen={modalOpen} />
    {/each}
  </div>
{/if}

{#if isPokemonLoading}
  <div class="loading-container">
    <Loader />
  </div>
{/if}

{#if isSearchFilter == false}
  <Pagination {pageOpt} on:pageChange={whenPageClick} />
{/if}

<style>
  .list-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 4rem;
    padding: 2rem;
    min-height: 1500px;
    min-width: 1400px;
  }

  .loading-container {
    height: 60vh;
    width: 1400px;
  }

  .showing-text {
    text-align: center;
    font-size: 1.4rem;
  }
</style>
