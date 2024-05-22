'use client';

import basemaps from '@/data/basemap.json';
import { Store } from '@/module/store';
import { OptionLayer } from '@/module/type';
import { useState } from 'react';
import LeftPanel from './left_panel';
import MapCanvas from './map';
import { Status } from './status';

export default function MapPage() {
  const [basemap, setBasemap] = useState(basemaps[0]);
  const [expandVisible, setExpandVisible] = useState(false);
  const [panelSelect, setPanelSelect] = useState<string>();
  const [layer, setLayer] = useState<OptionLayer>();
  const [urlDict, setUrlDict] = useState<Record<string, string>>({});
  const [showLayer, setShowLayer] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<string>();

  const states = {
    basemap,
    setBasemap,
    expandVisible,
    setExpandVisible,
    panelSelect,
    setPanelSelect,
    layer,
    setLayer,
    urlDict,
    setUrlDict,
    showLayer,
    setShowLayer,
    statusMessage,
    setStatusMessage,
  };

  return (
    <Store.Provider value={states}>
      <Status />
      <LeftPanel />
      <MapCanvas />
    </Store.Provider>
  );
}
