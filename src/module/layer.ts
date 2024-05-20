'use server';

import ee from '@google/earthengine';
import { authenticate, getKey, getMapId } from './ee';
import { OptionLayer } from './type';

export async function getLayers({ asset_id, vis, type }: OptionLayer) {
  const key = await getKey();

  // Authenticate
  await authenticate(key);

  let data: ee.Image | ee.ImageCollection | ee.FeatureCollection = ee[type](asset_id);

  const { urlFormat } = await getMapId(data, vis);

  return { urlFormat };
}
