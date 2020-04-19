import React from 'react';
// import ScrollContainer from 'react-indiana-drag-scroll'
import "../../../assets/scss/components/simulator.scss";

const PhoneSimulator = ({ className, type, messages, options = [], image }) => {
  const screenCls = `screen ${type}`;
  return (
    <div className="device-wrapper" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
      <div className="device" data-device="iPhone7" data-orientation="portrait" data-color="white">
        <div className={screenCls}>
          <Bubble text={messages} image={image} options={options} />
        </div>
      </div>
    </div>
  );
};

const Bubble = ({text, image = {}, options={}}) => {
  return <div className="bubles">
    { Object.keys(image).length > 0 &&
      <div className="buble buble-image">
        <h3 className="buble-title">KH Covid-19 Broadcast</h3>
        <img src={image.preview} className="dz-img" alt={image.name} />
        </div>
    }
    { text !== '' &&
      <div className="buble buble-message">
        <h3 className="buble-title">KH Covid-19 Broadcast</h3>
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
