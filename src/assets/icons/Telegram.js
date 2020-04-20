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

var Telegram = function Telegram(props) {
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
    d: "M 20.772 0.212 C 21.24 0.212 21.648 0.396 21.92 0.728 C 22.233 1.11 22.337 1.658 22.213 2.27 L 19.125 17.517 C 18.936 18.447 18.289 19.049 17.477 19.049 L 17.477 19.049 C 17.061 19.049 16.636 18.888 16.247 18.586 L 16.238 18.579 L 16.204 18.552 L 16.203 18.551 L 12.695 15.727 L 10.277 17.953 C 9.869 18.329 9.401 18.529 8.926 18.529 C 8.173 18.529 7.526 18.017 7.238 17.193 L 5.124 11.148 L 1.214 10.029 L 1.197 10.024 C 0.175 9.699 0.009 9.135 0 8.827 C -0.008 8.52 0.127 7.947 1.127 7.565 L 19.972 0.371 C 20.249 0.265 20.519 0.212 20.772 0.212 Z M 13.973 7.082 L 6.432 10.936 L 8.213 16.031 L 9.119 12.363 C 9.146 12.254 9.2 12.154 9.277 12.072 L 13.973 7.082 Z M 9.394 16.993 C 9.363 17.022 9.332 17.048 9.3 17.072 L 10.14 13.669 L 11.668 14.9 L 9.394 16.993 Z M 17.847 17.258 L 20.934 2.01 C 20.988 1.74 20.944 1.596 20.91 1.554 C 20.884 1.521 20.813 1.517 20.772 1.517 C 20.707 1.517 20.597 1.529 20.438 1.59 L 1.598 8.782 L 5.559 9.915 L 16.729 4.21 C 17.011 4.065 17.358 4.145 17.548 4.399 C 17.739 4.652 17.718 5.006 17.5 5.237 L 10.71 12.453 L 13.074 14.357 L 13.076 14.358 L 17.05 17.558 C 17.205 17.678 17.356 17.744 17.477 17.744 C 17.721 17.744 17.816 17.405 17.847 17.258 Z"
  }));
};

Telegram.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
Telegram.defaultProps = {
  color: 'currentColor',
  size: '24'
};
export default Telegram;
