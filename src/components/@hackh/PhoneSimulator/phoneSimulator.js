import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll'

const PhoneSimulator = ({ className, type, messages }) => {
  let socialType;
  switch (type) {
    case 'telegram': socialType = { background: '#19B7EA', bubbleBackground: '#fff' }; break;
    case 'messenger': socialType = { background: '#f1f0f0', bubbleBackground: '#d3d3d3' }; break;
    default: socialType = { background: '#fff', bubbleBackground: '#d3d3d3' }; break;
  }
  return (
    <div className="device-wrapper">
        <div className="device" data-device="iPhone7" data-orientation="portrait" data-color="white">
          <div className="screen" style={{
          pointerEvents: "auto",
          overflowY: 'scroll',
          backgroundColor: socialType.background,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end' }}
          >
            <ScrollContainer style={{
              fontSize: 10,
              borderRadius: 8,
              display: 'flex',
              padding: "5px 10px 5px 10px",
              minHeight: 20,
              width: "fit-content",
              margin: '0 40px 8px 8px',
              backgroundColor: socialType.bubbleBackground,
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
            }}
            >
              <span>{messages}</span>
            </ScrollContainer>
        </div>
      </div>
      <div class="button">
      </div>
    </div>
  );
};

export default PhoneSimulator;
