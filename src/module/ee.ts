import ee from '@google/earthengine';
import { MapId, VisObject } from '../module/type';

export async function getData({
  asset_id,
  type,
}: {
  asset_id: string;
  type: string;
}): Promise<ee.FeatureCollection | ee.Image | ee.ImageCollection> {
  const key = await getKey();

  // Authenticate
  await authenticate(key);

  let data: ee.Image | ee.ImageCollection | ee.FeatureCollection = ee[type](asset_id);

  return data;
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

/**
 * Function to authenticate EE
 * @param key
 * @returns
 */
export function authenticate(key: Record<string, any>): Promise<void> {
  return new Promise((resolve, reject) => {
    ee.data.authenticateViaPrivateKey(
      key,
      () =>
        ee.initialize(
          null,
          null,
          () => resolve(),
          (error: string) => reject(new Error(error)),
        ),
      (error: string) => reject(new Error(error)),
    );
  });
}

/**
 * Function evaluate ee object to readable object
 * @param element
 * @returns
 */
export function evaluate(element: ee<any>): Promise<any> {
  return new Promise((resolve, reject) => {
    element.evaluate((data: any, error: any) => (error ? reject(new Error(error)) : resolve(data)));
  });
}

/**
 * Function to get tile url from ee object
 * @param data
 * @param vis
 * @returns
 */
export function getMapId(
  data: ee.Image | ee.ImageCollection | ee.FeatureCollection | ee.Geometry,
  vis: VisObject | {},
): Promise<MapId> {
  return new Promise((resolve, reject) => {
    data.getMapId(vis, (object: MapId, error: string) =>
      error ? reject(new Error(error)) : resolve(object),
    );
  });
}
