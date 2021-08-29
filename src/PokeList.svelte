<script lang="ts">
  import { PokemonService } from "./pokemonService";
  import type { Pokemon } from "./pokemon.model";
  import { onMount } from "svelte";
  import localForage from "localforage";
  import PokeCard from "./PokeCard.svelte";
  import {
    searchValue,
    pokemonArr,
    orderValue,
    offsetValue,
    pokeCount,
  } from "./stores";
  import Pagination from "./Pagination.svelte";

  let ps = new PokemonService();
  let pokemons: Pokemon[] = [];
  let searchStr;
  let orderStr;

  onMount(() => {
    loadPokemonDetails(20, 120);

    //pokeCount.update((value) => 1128);
  });

  searchValue.subscribe((value) => {
    searchStr = value;
    filterPokemons(searchStr);
  });

  orderValue.subscribe((value) => {
    console.log(
      "🚀 ~ file: PokeList.svelte ~ line 46 ~ orderValue.subscribe ~ value",
      value
    );
    orderStr = value;

    switch (orderStr) {
      case "idAsc":
        pokemons = pokemons.sort((a, b) => (a.id < b.id ? -1 : 1));
        break;

      case "idDesc":
        pokemons = pokemons.sort((a, b) => (a.id > b.id ? -1 : 1));
        break;

      case "nameAsc":
        pokemons = pokemons.sort((a, b) => (a.name < b.name ? -1 : 1));
        break;

      case "nameDesc":
        pokemons = pokemons.sort((a, b) => (a.name > b.name ? -1 : 1));
        break;

      default:
        break;
    }
  });

  function loadOnOffset() {
    offsetValue.subscribe((value) => {
      loadPokemonDetails(value);
    });
  }

  function loadPokemonDetails(limit: number = 20, offset: number = 0) {
    ps.getPokemonNameList(limit, offset).then((res) => {
      pokeCount.update((value) => res.count);
      const pokeNames = res.results.map((ele) => ele.name);

      getCallPokemons(pokeNames).then((res) => {
        pokemons = res.map((ele: any) => {
          localForage.setItem("pokemon_" + ele.name, ele);
          return pokemonAdapter(ele);
        });

        pokemonArr.update((value) => pokemons);
      });
    });
  }

  async function getCallPokemons(pokeNames) {
    const pokes = await Promise.all(
      pokeNames.map((pokeName) => {
        return ps.getPokemonByName(pokeName);
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
    };

    return pokemon;
  }

  function filterPokemons(searchStr: string) {
    pokemons = $pokemonArr;
    if (searchStr && searchStr !== "") {
      pokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchStr.toLowerCase())
      );
    } else {
      pokemons = $pokemonArr;
    }
  }
</script>

<div class="list-container">
  {#each pokemons as pokemon}
    <PokeCard {pokemon} />
  {/each}
</div>

<Pagination />

<style>
  .list-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 4rem;
    padding: 2rem;
  }
</style>
