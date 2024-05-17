'use client';

import { Store } from '@/module/store';
import { Option } from '@/module/type';
import { useState } from 'react';
import LeftPanel from './left_panel';
import MapCanvas from './map';

export default function MapPage({
  defaultStates,
}: {
  defaultStates: { basemap: Option; basemaps: Option[] };
}) {
  const [basemap, setBasemap] = useState(defaultStates.basemap);

  const states = {
    basemap,
    setBasemap,
    basemaps: defaultStates.basemaps,
  };

  return (
    <Store.Provider value={states}>
      <LeftPanel />
      <MapCanvas />
    </Store.Provider>
  );
}
