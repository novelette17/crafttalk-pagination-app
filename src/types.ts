export type TSignInResponse = {
  token: string;
};

export type TGetProductsReponseEntry = {
  title: string;
  price: number;
  id: number;
};

export type TResponseWithPagination<
  S extends string,
  K extends Record<string, any>,
  T = Record<string, any>,
> = T & {
  total: number;
  limit: number;
  skip: number;
} & {
  [key in S]: K[];
};

export type TArgsPaginable<T extends Record<string, any>> = T &
  Partial<{
    limit: number;
    skip: number;
  }>;

export type TArgsSearchable<T extends Record<string, any>> = T &
  Partial<{
    search: string;
  }>;

export type TGetProductsArgs = TArgsPaginable<
  TArgsSearchable<Record<string, any>>
>;
