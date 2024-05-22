'use server';

import ee from '@google/earthengine';
import { LngLatLike } from 'maplibre-gl';
import { evaluate, getData, getMapId } from './ee';
import { OptionLayer } from './type';

export async function getLayers({ asset_id, vis, type }: OptionLayer) {
  const data = await getData({ asset_id, type });
  const { urlFormat } = await getMapId(data, vis);
  return { urlFormat };
}

export async function getInfo(
  coord: LngLatLike,
  { asset_id, type }: { asset_id: string; type: string },
) {
  const point = ee.Geometry.Point(coord);
  const data = await getData({ asset_id, type });

  let dict: ee.Dictionary;
  switch (type) {
    case 'FeatureCollection': {
      dict = data.filterBounds(point).first().toDictionary();
      break;
    }
  }

  const evaluated = await evaluate(dict);

  return evaluated;
}
