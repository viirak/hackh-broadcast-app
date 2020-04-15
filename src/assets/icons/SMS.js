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
    d: "M 6.208 10.395 C 5.996 10.395 5.813 10.326 5.66 10.188 C 5.507 10.051 5.43 9.858 5.43 9.609 C 5.43 9.399 5.503 9.22 5.651 9.068 C 5.797 8.917 5.977 8.841 6.192 8.841 C 6.408 8.841 6.591 8.915 6.742 9.065 C 6.895 9.215 6.971 9.396 6.971 9.609 C 6.971 9.855 6.895 10.046 6.742 10.185 C 6.591 10.325 6.412 10.395 6.208 10.395 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 9.489 10.395 C 9.277 10.395 9.095 10.326 8.941 10.188 C 8.787 10.051 8.71 9.858 8.71 9.609 C 8.71 9.399 8.784 9.22 8.931 9.068 C 9.077 8.917 9.259 8.841 9.473 8.841 C 9.688 8.841 9.872 8.915 10.024 9.065 C 10.176 9.215 10.251 9.396 10.251 9.609 C 10.251 9.855 10.176 10.046 10.024 10.185 C 9.871 10.325 9.693 10.395 9.489 10.395 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 12.771 10.395 C 12.558 10.395 12.377 10.326 12.224 10.188 C 12.069 10.051 11.993 9.858 11.993 9.609 C 11.993 9.399 12.065 9.22 12.213 9.068 C 12.36 8.917 12.54 8.841 12.755 8.841 C 12.97 8.841 13.154 8.915 13.305 9.065 C 13.457 9.215 13.533 9.396 13.533 9.609 C 13.533 9.855 13.457 10.046 13.305 10.185 C 13.154 10.325 12.976 10.395 12.771 10.395 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 3.532 18.304 C 3.594 18.341 3.665 18.361 3.736 18.361 C 3.801 18.361 3.865 18.345 3.923 18.313 C 4.046 18.247 4.125 18.12 4.13 17.982 C 4.185 16.5 4.582 16.052 5.443 15.726 C 6.826 16.36 8.399 16.696 10.005 16.696 C 15.03 16.696 19.118 13.445 19.118 9.45 C 19.118 5.454 15.03 2.203 10.005 2.203 C 4.98 2.203 0.892 5.454 0.892 9.45 C 0.892 10.663 1.277 11.86 2.005 12.921 C 1.218 15.28 1.769 17.234 3.532 18.304 Z M 1.68 9.45 C 1.68 5.888 5.415 2.991 10.005 2.991 C 14.595 2.991 18.33 5.888 18.33 9.45 C 18.33 13.01 14.596 15.908 10.006 15.908 C 8.457 15.908 6.946 15.576 5.634 14.945 C 5.54 14.9 5.434 14.893 5.335 14.927 C 4.139 15.34 3.583 15.973 3.403 17.229 C 2.373 16.28 2.159 14.803 2.814 12.993 C 2.859 12.87 2.839 12.732 2.761 12.626 C 2.054 11.658 1.68 10.56 1.68 9.45 Z"
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
