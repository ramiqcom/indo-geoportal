import MapPage from '@/components/map_page';
import basemaps from '@/data/basemap.json';
import features from '@/data/feature.json';
import layers from '@/data/layer.json';

export default function Page() {
  const basemap = basemaps.at(-1);

  const defaultStates = {
    basemap,
    basemaps,
    features,
    layers,
  };

  return (
    <>
      <MapPage defaultStates={defaultStates} />
    </>
  );
}
