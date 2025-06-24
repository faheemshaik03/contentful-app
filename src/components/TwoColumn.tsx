import React from 'react';

const TwoColumn = () => {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      <div style={{ flex: 1 }}>
        <h3>📄 Left Column</h3>
        <p>Heading, subtitle, CTA</p>
      </div>
      <div style={{ flex: 1 }}>
        <img src="https://via.placeholder.com/150" alt="Right side" />
      </div>
    </div>
  );
};

export default TwoColumn;
