export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

export type CharactersResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};
