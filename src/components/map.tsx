import { getInfo, getLayers } from '@/module/server';
import { Store } from '@/module/store';
import { OptionLayer } from '@/module/type';
import { Map, RasterTileSource } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useContext, useEffect, useState } from 'react';

export default function MapCanvas() {
  const { basemap, layer, urlDict, setUrlDict, showLayer, setStatusMessage, setInfo } =
    useContext(Store);

  const mapDivId = 'map';
  const layerId = 'layer';

  const [map, setMap] = useState<Map>();
  const [mapLoaded, setMapLoaded] = useState(false);

  // Function to generate the url
  async function generateLayer(layer: OptionLayer) {
    // Set message
    setStatusMessage('Calling layer...');

    let url: string;

    if (urlDict[layer.value]) {
      url = urlDict[layer.value];
    } else {
      try {
        const { urlFormat } = await getLayers(layer);
        url = urlFormat;
        const newDict = urlDict;
        newDict[layer.value] = url;
        setUrlDict(newDict);
      } catch ({ message }) {
        setStatusMessage(message);
      }
    }

    if (map.getSource(layerId)) {
      const source = map.getSource(layerId) as RasterTileSource;
      source.setTiles([url]);
    } else {
      map.addSource(layerId, {
        type: 'raster',
        tiles: [url],
        tileSize: 256,
      });
      map.addLayer({
        type: 'raster',
        source: layerId,
        id: layerId,
        maxzoom: 20,
        minzoom: 0,
      });
    }

    setStatusMessage(undefined);
  }

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
    if (mapLoaded && basemap) {
      map.setStyle(`${basemap.value}?api_key=${process.env.NEXT_PUBLIC_STADIA_KEY}`);
    }
  }, [mapLoaded, basemap]);

  useEffect(() => {
    if (layer) {
      generateLayer(layer);

      map.on('styledata', async () => {
        await generateLayer(layer);
      });

      map.on('click', async (e) => {
        setInfo(<div>Loading...</div>);
        const coord = e.lngLat.toArray();

        try {
          const info = await getInfo(coord, layer);
          const keys = Object.keys(info);
          const divs = keys.map((key, index) => (
            <div key={index}>
              {key}: {info[key]}
            </div>
          ));
          setInfo(divs);
        } catch ({ message }) {
          setInfo(<div>{message}</div>);
        }
      });
    }
  }, [mapLoaded, layer]);

  useEffect(() => {
    if (mapLoaded && map.getSource(layerId)) {
      map.setLayoutProperty(layerId, 'visibility', showLayer ? 'visible' : 'none');
    }
  }, [mapLoaded, showLayer]);

  return <div id={mapDivId}></div>;
}
