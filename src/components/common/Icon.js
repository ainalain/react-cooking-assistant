import React from 'react';
const Icon = ({ width = 16 , height = 16, className = 'icon', glyph }) => {
  return (
    <svg className={className} width={width} height={height}>
      <use xlinkHref={`#${glyph.id}`} />
    </svg>
  );
};

export default Icon;
