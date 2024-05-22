import { Store } from '@/module/store';
import { useContext } from 'react';

export function Info() {
  const { info } = useContext(Store);
  if (info) {
    return (
      <div id='info' className='flexible vertical center2 center3'>
        {info}
      </div>
    );
  }
}
