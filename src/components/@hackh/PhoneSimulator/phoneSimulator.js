import React from 'react';
import 'html5-device-mockups/dist/device-mockups.min.css';
import { IPhone7 } from 'react-device-mockups';

const PhoneSimulator = ({ className, type, messages }) => {
  let socialType;
  switch (type) {
    case 'telegram': socialType = { background: '#19B7EA', bubbleBackground: '#fff' }; break;
    case 'messenger': socialType = { background: '#f1f0f0', bubbleBackground: '#d3d3d3' }; break;
    default: socialType = { background: '#fff', bubbleBackground: '#d3d3d3' }; break;
  }
  return (
    <div className={`virtual-device ${className}`}>
      <IPhone7
        height={500}
        orientation="portrait"
        color="black"
      >
        <div style={{ height: '100%',
          overflowY: 'scroll',
          backgroundColor: socialType.background,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end' }}
        >
          <div style={{
            fontSize: 10,
            borderRadius: 8,
            display: 'flex',
            paddingTop: 5,
            paddingLeft: 10,
            paddingRight: 10,
            minHeight: 20,
            margin: '0 40px 8px 8px',
            borderStyle: 'solid',
            borderWidth: '1px',
            backgroundColor: socialType.bubbleBackground,
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
          >
            <span>{messages}</span>
          </div>
        </div>
      </IPhone7>
    </div>
  );
};

export default PhoneSimulator;
