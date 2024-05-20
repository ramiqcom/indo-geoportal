'use client';

import { Store } from '@/module/store';
import { Option, OptionFeature, OptionLayer } from '@/module/type';
import { useState } from 'react';
import LeftPanel from './left_panel';
import MapCanvas from './map';

export default function MapPage({
  defaultStates,
}: {
  defaultStates: {
    basemap: Option;
    basemaps: Option[];
    features: OptionFeature[];
    layers: OptionLayer[];
  };
}) {
  const [basemap, setBasemap] = useState(defaultStates.basemap);
  const [expandVisible, setExpandVisible] = useState(false);
  const [panelSelect, setPanelSelect] = useState<string>();
  const [layer, setLayer] = useState<OptionLayer>();
  const [urlDict, setUrlDict] = useState<Record<string, string>>({});
  const [showLayer, setShowLayer] = useState<boolean>(true);

  const states = {
    basemap,
    setBasemap,
    basemaps: defaultStates.basemaps,
    expandVisible,
    setExpandVisible,
    panelSelect,
    setPanelSelect,
    layer,
    setLayer,
    features: defaultStates.features,
    layers: defaultStates.layers,
    urlDict,
    setUrlDict,
    showLayer,
    setShowLayer,
  };

  return (
    <Store.Provider value={states}>
      <LeftPanel />
      <MapCanvas />
    </Store.Provider>
  );
}
