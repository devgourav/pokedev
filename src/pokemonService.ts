const baseUrl = "https://pokeapi.co/api/v2/";
import localForage from "localforage";

export class PokemonService {
  constructor() {}

  async getPokemonNameList(limit: number) {
    return localForage.getItem("pokemon_list").then(async (val) => {
      if (val) {
        return Promise.resolve(val);
      } else {
        const res = await fetch(`${baseUrl}pokemon/?limit=${limit}`);
        if (res.ok) {
          console.log("pokemon names from api");
          return res.json();
        }
        return null;
      }
    });
  }

  async getPokemonByName(name) {
    return localForage.getItem("pokemon_" + name).then(async (val) => {
      if (val) {
        console.log(name + "from cache");
        return val;
      } else {
        const res = await fetch(`${baseUrl}pokemon/${name}`);

        if (res.ok) {
          console.log(name + "from api");
          return res.json();
        }

        return null;
      }
    });
  }
}
