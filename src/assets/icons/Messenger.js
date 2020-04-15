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
    d: "M0 9.25875C0 4.145 4.4775 0 10 0C15.5225 0 20 4.14625 20 9.26C20 14.3738 15.5225 18.5188 10 18.5188C9.0025 18.5188 8.04 18.3825 7.13125 18.1313L3.72625 20V16.4688C1.45375 14.7713 0 12.1725 0 9.25875ZM8.44749 9.75251L10.9937 12.4688L16.46 6.66625L11.5537 9.38251L8.94499 6.66625L3.47874 12.4688L8.44749 9.75251Z"
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
