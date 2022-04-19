export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
  name: string;
  id: number;
  image: string;
  types: string[];
  abilities: Ability[];
  stats: Stat[];
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}
