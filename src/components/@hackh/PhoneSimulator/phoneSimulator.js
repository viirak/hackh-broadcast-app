import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll'
import "../../../assets/scss/components/simulator.scss";

const PhoneSimulator = ({ className, type, messages, options = [], image }) => {
  const screenCls = `screen ${type}`;
  return (
    <div className="device-wrapper" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
      <div className="device" data-device="iPhone7" data-orientation="portrait" data-color="white">
        <div className={screenCls}>
          <ScrollContainer className="scroll-container">
            <Bubble type={type} text={messages} image={image} options={options} />
          </ScrollContainer>
        </div>
      </div>
    </div>
  );
};

const Bubble = ({type, text, image = {}, options={}}) => {
  const channelTitle = "KH Covid-19 Broadcast";
  return <div className="bubles">
    { Object.keys(image).length > 0 &&
      <div className="buble buble-image">
        {type === 'telegram' && <h3 className="buble-title">{channelTitle}</h3>}
        <img src={image.preview} className="dz-img" alt={image.name} />
        </div>
    }
    { text !== '' &&
      <div className="buble buble-message">
        {type === 'telegram' && <h3 className="buble-title">{channelTitle}</h3>}
        <div className="message">{text}</div>
        {!!options.length &&
          <div className="poll">
            <h4 className="buble-sub-title">Poll</h4>
            {options.map((opt) => {
              return <div className="option"><span className="icon"></span><span className="text">{opt}</span></div>
            })}
          </div>
        }
      </div>
    }
  </div>
}

export default PhoneSimulator;
