const baseUrl = "https://pokeapi.co/api/v2/";
import localForage from "localforage";

export class PokemonService {
  constructor() {}

  async getPokemonNameList(limit: number = 0, offset: number = 0) {
    const res = await fetch(
      `${baseUrl}pokemon/?limit=${limit}&offset=${offset}`
    );
    if (res.ok) {
      console.log("pokenames from api");
      return res.json();
    }
    return null;
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
