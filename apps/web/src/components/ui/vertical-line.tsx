import React from 'react';

const VerticalLine = ({ height = '45px', width = '2px', color = 'black' }) => {
  return (
    <div style={{ width, height, backgroundColor: color }}></div>
  );
};

export default VerticalLine;
