import { Dispatch, SetStateAction } from 'react';

export type Option = { label: string; value: any };

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type GlobalContext = {
  basemap?: Option;
  setBasemap?: SetState<Option>;
  basemaps?: Option[];
};
