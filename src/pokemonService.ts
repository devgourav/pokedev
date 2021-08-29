const baseUrl = "https://pokeapi.co/api/v2/";

export class PokemonService {
  constructor() {}

  async getPokemonNameList(limit: number = 20) {
    const res = await fetch(`${baseUrl}pokemon/?limit=${limit}`);
    if (res.ok) {
      return res.json();
    }

    return null;
  }

  async getPokemonByName(name) {
    const res = await fetch(`${baseUrl}pokemon/${name}`);

    if (res.ok) {
      return res.json();
    }

    return null;
  }
}
