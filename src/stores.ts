import { readable, writable } from "svelte/store";

export const searchValue = writable("");

export const pokemonArr = writable([]);

export const orderValue = writable("");

export const offsetValue = writable(0);

export const pokeCount = writable(0);

export const limitValue = readable(20);
