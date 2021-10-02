<script lang="ts">
  import type { Pokemon, PokemonSpecies } from "../pokemon.model";
  import { createEventDispatcher, onMount } from "svelte";
  import { PokemonService } from "../pokemonService";
  import { decimeterToFeet, kgsToPound } from "../utility";
  import { pokeColor } from "../data/color";
  import { modalPokemonName } from "../stores";
  import Loader from "./Loader.svelte";

  export let modalPokemon: Pokemon;
  let pokemon: Pokemon;

  const dispatch = createEventDispatcher();
  let ps = new PokemonService();
  let isLoading = true;
  let stats = [];

  let bgColor = "white";
  let textColor = "#333";

  $: cssVarStyles = `--bg-color:${bgColor};--text-color:${textColor}`;

  onMount(() => {
    getDetailedData(modalPokemon);
  });

  function closeModal() {
    dispatch("modalClose", { close: true });
  }

  const sendFamily = (pokeName) => {
    dispatch("sendFamily", { name: pokeName });
  };

  modalPokemonName.subscribe((res: Pokemon) => {
    console.log(
      "🚀 ~ file: PokeModal.svelte ~ line 35 ~ modalPokemonName.subscribe ~ res",
      res
    );

    if (Object.keys(res).length > 0) {
      getDetailedData(res);
    }
  });

  function getDetailedData(data: Pokemon) {
    console.log(
      "🚀 ~ file: PokeModal.svelte ~ line 49 ~ getDetailedData ~ data",
      data
    );

    pokemon = data;

    isLoading = true;
    ps.getPokemonSpecies(pokemon.species.url).then((res) => {
      if (res) {
        pokemon.speciesData = speciesAdapter(res);

        stats = pokemon.stats;

        ps.getEvolutionChain(pokemon.speciesData.evolution).then((res) => {
          if (res) {
            pokemon.evolution = [];
            getChain(res.chain);
            console.log(
              "🚀 ~ file: PokeModal.svelte ~ line 42 ~ getChain ~ pokemon",
              pokemon
            );

            setColor(pokemon.speciesData.color);

            isLoading = false;

            // pokemon.evolution = pokemon.evolution.map()
          }
        });
      }
    });
  }

  function setColor(color) {
    bgColor = pokeColor.find((ele) => ele.original === color).material;
  }

  function getChain(obj) {
    pokemon.evolution.push(obj.species);

    if (obj.evolves_to.length > 0) {
      getChain(obj.evolves_to[0]);
    }
  }

  const url = new URL("https://pokeapi.co/api/v2/pokemon-species/26/");

  function speciesAdapter(ele): PokemonSpecies {
    let pokemon: PokemonSpecies = {
      base_happiness: ele.base_happiness,
      color: ele.color.name,
      evolution: ele.evolution_chain.url,
      description: ele.flavor_text_entries
        .filter((text) => text.language.name === "en")
        .map((text) => text.flavor_text)[0],
      habitat: ele.habitat ? ele.habitat.name : " ",
      jp_name: ele.names
        .filter((name) => name.language.name === "ja")
        .map((name) => name.name)[0],
      genera: ele.genera
        .filter((genus) => genus.language.name === "en")
        .map((genus) => genus.genus)[0],
    };

    return pokemon;
  }

  function getAssetUrl() {
    let id = pokemon.id.toString().padStart(3, "0");

    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
  }

  function loadDefaultImage(event) {
    console.log(
      "🚀 ~ file: PokeModal.svelte ~ line 95 ~ loadDefaultImage ~ event",
      event
    );
    event.src = pokemon.frontImage;
  }
</script>

<div class="modal-screen">
  {#if !isLoading}
    <div class="modal-container" style={cssVarStyles}>
      <div class="close-btn" on:click={() => closeModal()}>✘</div>
      <div class="row">
        <div class="col">
          <div class="avatar">
            <img
              src={getAssetUrl()}
              alt={pokemon.name}
              on:error={loadDefaultImage}
            />
          </div>
        </div>
        <div class="col">
          <p class="name">
            #{pokemon.id}
            {pokemon.name} ({pokemon.speciesData.jp_name})
          </p>
          <div class="genera">{pokemon.speciesData.genera}</div>
          <p class="type">{pokemon.types.reduce((a, b) => a + " , " + b)}</p>
          <p class="weight">
            Weight: {pokemon.weight / 10} kg or {kgsToPound(
              pokemon.weight / 10
            )} lbs
          </p>
          <p class="height">
            Height: {pokemon.height / 10} m or {decimeterToFeet(pokemon.height)}
          </p>
        </div>
      </div>

      <div class="row">
        <p class="description">
          {pokemon.speciesData.description.replace(/\f/g, " ")}
        </p>
      </div>

      <div class="row">
        <p class="stats">
          {#each pokemon.stats as stat}
            <div class="stat-row">
              <span class="stat-label">{stat.name}</span>
              <span class="stat-label">{stat.base_stat}</span>
            </div>
          {/each}
        </p>
      </div>

      <div class="row family-row">
        <div class="label">Family</div>
        <div class="family">
          {#each pokemon.evolution as name}
            <div class="link" on:click={() => sendFamily(name.name)}>
              <span>{name.name}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  {#if isLoading}
    <div class="modal-container" style={cssVarStyles}>
      <Loader />
    </div>
  {/if}
</div>

<style>
  .modal-screen {
    z-index: 200;
    width: 100vw;
    height: 100vh;
    background-color: rgba(96, 128, 160, 0.74);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
  }

  .modal-container {
    z-index: 250;
    width: 700px;
    height: 700px;
    background-color: white;
    border-radius: 8px;
    padding: 2rem;
    color: var(--text-color, #333);
    background-color: var(--bg-color, white);
    font-size: 1.2rem;
  }

  .row {
    display: flex;
    justify-content: center;
  }

  .col {
    width: 100%;
  }

  .avatar img {
    width: 300px;
    height: 300px;
  }

  .name {
    text-transform: capitalize;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .type {
    text-transform: uppercase;
  }

  .stats {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 400px;
  }

  .stat-row {
    display: flex;
    justify-content: space-between;
    padding-bottom: 8px;
  }

  .family-row {
    flex-direction: column;
    align-items: center;
  }

  .stat-label {
    text-transform: capitalize;
  }

  .family {
    text-transform: capitalize;
    font-weight: bold;
    margin-top: 1.25rem;
  }

  .family .link + .link:before {
    content: "🠪";
  }

  .close-btn {
    float: right;
    font-size: 1.8rem;
    margin-top: -15px;

    cursor: pointer;
  }

  .link {
    display: inline;
    cursor: pointer;
  }

  .link:hover {
    color: #3c3399;
  }
</style>
