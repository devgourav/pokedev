export type Pokemon = {
  id: number;
  height: number;
  weight: number;
  name: string;
  frontImage: string;
  crySound: string;
  types: string[];
  abilities: string[];
  base_experience: number;
  moves: string[];
  species: Species;
  stats: Stat[];
  speciesData?: PokemonSpecies;
  evolution?: any[];
};

export type PokemonSpecies = {
  base_happiness: string;
  color: string;
  evolution: string;
  description: string;
  jp_name: string;
  habitat: string;
  genera: string;
};

type Stat = {
  name: string;
  base_stat: number;
};

type Species = {
  name: string;
  url: number;
};
