import { Store } from '@/module/store';
import { useContext } from 'react';

export default function LeftPanel() {
  const { setExpandVisible, setPanelSelect, features } = useContext(Store);

  const featuresDiv = features.map((feat, index) => {
    const { value, label, icon } = feat;

    const div = (
      <div
        className='flexible vertical small-gap center1 text-center panel-select'
        style={{ cursor: 'default' }}
        onMouseEnter={() => setPanelSelect(value)}
        key={index}
      >
        <div className='material-symbols-outlined' style={{ width: '100%', fontSize: 'xx-large' }}>
          {icon}
        </div>
        <div style={{ fontSize: 'smaller' }}>{label}</div>
      </div>
    );

    return div;
  });

  return (
    <div id='left-panel' className='flexible'>
      <div id='left-panel-small' onMouseEnter={() => setExpandVisible(true)}>
        {featuresDiv}
      </div>
      <LeftPanelExpand />
    </div>
  );
}

function LeftPanelExpand() {
  const { expandVisible, setExpandVisible, panelSelect } = useContext(Store);

  const panelDict = {
    basemap: <BasemapSelect />,
    layer: <LayerSelect />,
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
  const { basemap, basemaps, setBasemap } = useContext(Store);

  const basemapsList = basemaps.map((op, index) => (
    <button
      className='option-button'
      disabled={basemap.value == op.value}
      key={index}
      onClick={() => setBasemap(op)}
    >
      {op.label}
    </button>
  ));

  return <div className='flexible vertical small-gap'>{basemapsList}</div>;
}

function LayerSelect() {
  const { layer, setLayer, layers, showLayer, setShowLayer } = useContext(Store);

  const layerList = layers.map((op, index) => (
    <button
      className='option-button'
      disabled={layer ? layer.value == op.value : false}
      key={index}
      onClick={() => setLayer(op)}
    >
      {op.label}
    </button>
  ));

  return (
    <div className='flexible vertical small-gap'>
      <div className='flexible'>
        <input
          type='checkbox'
          checked={showLayer}
          onChange={(e) => setShowLayer(e.target.checked)}
        />
        Show layer
      </div>
      {layerList}
    </div>
  );
}
