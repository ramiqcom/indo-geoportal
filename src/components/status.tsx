import { Store } from '@/module/store';
import { useContext } from 'react';

export function Status() {
  const { statusMessage } = useContext(Store);
  if (statusMessage) {
    return (
      <div id='status' className='flexible vertical center1 center2 center3'>
        {statusMessage}
      </div>
    );
  }
}
