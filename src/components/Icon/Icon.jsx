import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ width, height, className, glyph }) => (
  <svg className={className} width={width} height={height}>
    <use xlinkHref={`#${glyph.id}`} />
  </svg>
);

Icon.defaultProps = {
  width: 16,
  height: 16,
};

Icon.propTypes = {
  className: PropTypes.string.isRequired,
  glyph: PropTypes.object.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Icon;
