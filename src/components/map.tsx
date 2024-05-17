import { Store } from '@/module/store';
import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useContext, useEffect } from 'react';

export default function MapCanvas() {
  const { basemap } = useContext(Store);

  const mapDivId = 'map';

  useEffect(() => {
    const map = new Map({
      container: mapDivId,
      zoom: 4,
      center: [120, 0],
      style: `${basemap.value}?api_key=${process.env.NEXT_PUBLIC_STADIA_KEY}`,
    });
  }, []);

  return <div id={mapDivId}></div>;
}
