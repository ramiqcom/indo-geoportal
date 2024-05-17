import { Store } from '@/module/store';
import { useContext } from 'react';

export default function LeftPanel() {
  const { setExpandVisible, setPanelSelect } = useContext(Store);

  return (
    <div id='left-panel' className='flexible'>
      <div id='left-panel-small' onMouseEnter={() => setExpandVisible(true)}>
        <div
          className='flexible vertical small-gap center1 text-center panel-select'
          style={{ cursor: 'default' }}
          onMouseEnter={() => setPanelSelect('basemap')}
        >
          <div
            className='material-symbols-outlined'
            style={{ width: '100%', fontSize: 'xx-large' }}
          >
            public
          </div>
          <div style={{ fontSize: 'smaller' }}>Basemap</div>
        </div>
      </div>
      <LeftPanelExpand />
    </div>
  );
}

function LeftPanelExpand() {
  const { expandVisible, setExpandVisible, panelSelect } = useContext(Store);

  const panelDict = {
    basemap: <BasemapSelect />,
  };

  return (
    <div
      id='left-panel-expand'
      style={{ visibility: expandVisible ? 'visible' : 'collapse' }}
      onMouseLeave={() => setExpandVisible(false)}
    >
      <div style={{ padding: '1vh' }}>{panelDict[panelSelect]}</div>
    </div>
  );
}

function BasemapSelect() {
  const { basemaps, setBasemap } = useContext(Store);

  const basemapsList = basemaps.map((op, index) => (
    <div
      className='option-button'
      key={index}
      style={{ border: 'thin solid white', padding: '1vh', cursor: 'default' }}
      onClick={() => setBasemap(op)}
    >
      {op.label}
    </div>
  ));

  return <div className='flexible vertical small-gap'>{basemapsList}</div>;
}
