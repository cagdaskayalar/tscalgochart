import React from 'react';

export interface OHLCSeriesProps {
  data?: any[];
}

const OHLCSeries: React.FC<OHLCSeriesProps> = ({ data }) => {
  return (
    <g>
      {/* OHLC çubuk çizimi buraya gelecek */}
    </g>
  );
};

export default OHLCSeries; 