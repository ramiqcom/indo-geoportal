import { Dispatch, SetStateAction } from 'react';

export interface Option {
  label: string;
  value: any;
}

export interface OptionFeature extends Option {
  icon: string;
}

export interface OptionLayer extends Option {
  value: string;
  asset_id: string;
  type: string;
  vis: VisObject;
  url?: string;
}

export type SetState<T> = Dispatch<SetStateAction<T>>;

export interface VisObject {
  bands?: string[] | string;
  min?: number[] | number;
  max?: number[] | number;
  palette?: string[] | string;
  color?: string;
  opacity?: number;
}

export interface MapId {
  mapid: string;
  urlFormat: string;
  image: Object;
}

export interface GlobalContext {
  basemap: Option;
  setBasemap: SetState<Option>;
  expandVisible: boolean;
  setExpandVisible: SetState<boolean>;
  panelSelect: string;
  setPanelSelect: SetState<string>;
  layer: OptionLayer;
  setLayer: SetState<OptionLayer>;
  urlDict: Record<string, string>;
  setUrlDict: SetState<Record<string, string>>;
  showLayer: boolean;
  setShowLayer: SetState<boolean>;
  statusMessage: string;
  setStatusMessage: SetState<string>;
  info: JSX.Element | JSX.Element[];
  setInfo: SetState<JSX.Element | JSX.Element[]>;
}
