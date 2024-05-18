import MapPage from '@/components/map_page';
import basemaps from '@/data/basemap.json';

export default function Page() {
  const basemap = basemaps.at(-1);

  const defaultStates = {
    basemap,
    basemaps,
  };

  return (
    <>
      <MapPage defaultStates={defaultStates} />
    </>
  );
}
