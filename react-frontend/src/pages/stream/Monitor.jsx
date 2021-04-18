import React from 'react';
import './monitor.scss';

function Monitor() {
  return (
    <div className="Monitor App-content">
      <h1 className="pageHeader">Monitor</h1>
      <div className='feed'>
        <img 
          src={'http://127.0.0.1:5000/stream_mask'}
          onError={"this.onerror=null; this.src='VideoUnavailable.png';"} 
          className='stream' alt="logo" />
      </div>
    </div>
  );
}

export default Monitor;