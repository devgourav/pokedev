<script lang="ts">
  import type { Pokemon } from "../pokemon.model";
  import { decimeterToFeet } from "../utility";
  import { createEventDispatcher } from "svelte";

  export let pokemon: Pokemon;
  const dispatch = createEventDispatcher();

  function openModel() {
    dispatch("modalOpen", { id: pokemon.id });
  }
</script>

<div class="pokeCard" on:click={() => openModel()}>
  <div class="avatar">
    <img src={pokemon.frontImage} alt={pokemon.name} />
  </div>
  <div class="id">
    #{pokemon.id.toString().padStart(3, "0")}
  </div>
  <div class="name">
    {pokemon.name}
  </div>

  <div class="type">
    {pokemon.types.join(", ")}
  </div>
  <div class="stats">
    <div class="weight">
      <p>Weight</p>

      {pokemon.weight / 10} kg
    </div>

    <div class="height">
      <p>Height</p>
      {decimeterToFeet(pokemon.height)}
    </div>
  </div>
</div>

<style>
  .pokeCard {
    border-radius: 8px;
    padding: 1rem;
    width: 200px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-size: 1rem;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    cursor: pointer;
  }

  .pokeCard .name {
    font-weight: 500;
    font-size: 1.5rem;
    text-transform: uppercase;
  }

  .pokeCard .type {
    text-transform: capitalize;
  }

  .stats {
    display: flex;
    justify-content: space-around;
    width: 100%;
    text-align: center;
  }
</style>
