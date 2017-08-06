import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ width = 16 , height = 16, className, glyph }) => {
  return (
    <svg className={className} width={width} height={height}>
      <use xlinkHref={`#${glyph.id}`} />
    </svg>
  );
};

Icon.propTypes = {
  className: PropTypes.string.isRequired,
  glyph: PropTypes.object.isRequired,
  width: PropTypes.string,
  height: PropTypes.string
};

export default Icon;
