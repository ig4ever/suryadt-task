export type Cat = {
  id: string;
  name: string;
};

export type Owner = {
  id: string;
  name: string;
  cats: Cat[];
};
