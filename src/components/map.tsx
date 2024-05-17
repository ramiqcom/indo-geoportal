import { Store } from '@/module/store';
import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useContext, useEffect, useState } from 'react';

export default function MapCanvas() {
  const { basemap } = useContext(Store);

  const mapDivId = 'map';

  const [map, setMap] = useState<Map>();
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const map = new Map({
      container: mapDivId,
      zoom: 4,
      center: [120, 0],
      style: `${basemap.value}?api_key=${process.env.NEXT_PUBLIC_STADIA_KEY}`,
    });
    setMap(map);

    map.on('load', () => setMapLoaded(true));
  }, []);

  useEffect(() => {
    if (mapLoaded) {
      map.setStyle(`${basemap.value}?api_key=${process.env.NEXT_PUBLIC_STADIA_KEY}`);
    }
  }, [mapLoaded, basemap]);

  return <div id={mapDivId}></div>;
}
