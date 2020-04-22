import React from 'react';
import PropTypes from 'prop-types';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var Messenger = function Messenger(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ["color", "size"]);

  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, otherProps), /*#__PURE__*/React.createElement("path", {
    d: "M23.06,11.48c0,5.27-4.98,9.55-11.13,9.55c-1.24,0-2.42-0.17-3.53-0.49c0,0-1.13,0.73-4.41,2.75l0.86-4.44 c-2.47-1.75-4.05-4.4-4.05-7.37c0-5.27,4.98-9.55,11.13-9.55S23.06,6.21,23.06,11.48z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "5.56,13.92 10.9,9.06 13.55,11.34 18.31,9.06 12.97,14.16 10.32,11.61 "
  }));
};

Messenger.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
Messenger.defaultProps = {
  color: 'currentColor',
  size: '24'
};
export default Messenger;
