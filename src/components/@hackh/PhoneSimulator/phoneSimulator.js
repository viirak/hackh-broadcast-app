import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll'

const PhoneSimulator = ({ className, type, messages, options = [], image }) => {
  let socialType;
  switch (type) {
    case 'telegram': socialType = { background: '#19B7EA', bubbleBackground: '#fff', optionBackground: '#dadddc' }; break;
    case 'messenger': socialType = { background: '#f1f0f0', bubbleBackground: '#d3d3d3', optionBackground: '#00B2FF' }; break;
    default: socialType = { background: '#fff', bubbleBackground: '#d3d3d3', optionBackground: '#00B2FF' }; break;
  }

  return (
    <div className="device-wrapper" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <div className="device" data-device="iPhone7" data-orientation="portrait" data-color="white">
          <div className="screen" style={{
          pointerEvents: "auto",
          overflowY: 'scroll',
          backgroundColor: socialType.background,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end' }}
          >
            {!!image && <Bubble style={{ padding: 0 }} image={image} /> }
            {!!messages && <Bubble text={messages} bgColor={socialType.bubbleBackground} />}
            {
              !!options.length &&
              options.map(opt => <Bubble
                style={{ opacity: 0.8, width: '200px', textAlign: 'center' }}
                text={opt} bgColor={socialType.optionBackground} />)
            }
        </div>
      </div>
      <div class="button">
      </div>
    </div>
  );
};

const Bubble = ({bgColor, text, style = {}, image = {}}) => <ScrollContainer style={{
  fontSize: 10,
  borderRadius: 8,
  display: 'flex',
  flexDirection: 'column',
  padding: "5px 10px 5px 10px",
  minHeight: 20,
  width: "fit-content",
  margin: '0 40px 8px 8px',
  backgroundColor: bgColor,
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
  maxWidth: '200px',
  ...style
}}
> 
  { image && <img src={image.preview} className="dz-img" alt={image.name} />}
  <div>{text}</div>
</ScrollContainer>

export default PhoneSimulator;
