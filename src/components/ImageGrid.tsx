import React from 'react';

const ImageGrid = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
      <img src="https://via.placeholder.com/100" alt="Grid 1" />
      <img src="https://via.placeholder.com/100" alt="Grid 2" />
      <img src="https://via.placeholder.com/100" alt="Grid 3" />
      <img src="https://via.placeholder.com/100" alt="Grid 4" />
    </div>
  );
};

export default ImageGrid;
