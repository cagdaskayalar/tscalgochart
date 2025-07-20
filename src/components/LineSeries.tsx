import React from 'react';

export interface LineSeriesProps {
  data?: any[];
}

const LineSeries: React.FC<LineSeriesProps> = ({ data }) => {
  return (
    <g>
      {/* Çizgi grafik çizimi buraya gelecek */}
    </g>
  );
};

export default LineSeries; 