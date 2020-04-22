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

var SMS = function SMS(props) {
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
    d: "M20.86,17.15H6v2.17l-1.81-2.14l-1.05-0.03C1.96,17.15,1,16.11,1,14.83V7.55c0-1.28,0.96-2.32,2.14-2.32h17.72 c1.18,0,2.14,1.04,2.14,2.32v7.29C23,16.11,22.04,17.15,20.86,17.15z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7.71,10.81c0,0.81-0.77,1.47-1.58,1.47s-1.47-0.66-1.47-1.47s0.66-1.47,1.47-1.47S7.71,9.99,7.71,10.81z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13.6,10.81c0,0.81-0.79,1.47-1.6,1.47s-1.47-0.66-1.47-1.47S11.19,9.34,12,9.34S13.6,9.99,13.6,10.81z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.48,10.81c0,0.81-0.8,1.47-1.61,1.47s-1.47-0.66-1.47-1.47s0.66-1.47,1.47-1.47S19.48,9.99,19.48,10.81z"
  }));
};

SMS.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
SMS.defaultProps = {
  color: 'currentColor',
  size: '24'
};
export default SMS;
