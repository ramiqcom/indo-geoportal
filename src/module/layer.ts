'use server';

import 'node-self';

import ee from '@google/earthengine';
import { authenticate, getMapId } from './ee';
import { OptionLayer } from './type';

export async function getLayers({ asset_id, vis, type }: OptionLayer) {
  const key = await getKey();

  // Authenticate
  await authenticate(key);

  let data: ee.Image | ee.ImageCollection | ee.FeatureCollection = ee[type](asset_id);

  const { urlFormat } = await getMapId(data, vis);

  return { urlFormat };
}

export async function getKey(): Promise<Record<string, any>> {
  const res = await fetch(process.env.SERVICE_ACCOUNT_KEY_URL, {
    headers: {
      Authorization: `token ${process.env.GH_TOKEN}`,
    },
  });
  const key = await res.json();
  return key;
}
