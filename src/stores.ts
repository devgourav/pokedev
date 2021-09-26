import { derived, readable, writable } from "svelte/store";

export const searchValue = writable("");

export const pokemonArr = writable([]);

export const orderValue = writable("");

export const typeFilter = writable("");

export const offsetValue = writable(0);

export const totalItemCount = writable(0);

export const pageSelected = writable(0);

export const itemsInPage = writable(20);

export const pageOptions = derived(
  [totalItemCount, itemsInPage],
  ($values, set) => {
    set({
      totalItemCount: $values[0],
      itemsInPage: $values[1],
    });
  }
);
