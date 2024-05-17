import { useState } from 'react';

export default function LeftPanel() {
  const [expandVisible, setExpandVisible] = useState(false);

  return (
    <>
      <div id='left-panel' onMouseEnter={() => setExpandVisible(true)}></div>
      <div
        id='left-panel-expand'
        style={{ visibility: expandVisible ? 'visible' : 'collapse' }}
        onMouseLeave={() => setExpandVisible(false)}
      ></div>
    </>
  );
}
