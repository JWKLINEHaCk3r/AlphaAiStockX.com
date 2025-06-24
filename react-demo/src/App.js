import React from 'react';

const App = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '2rem', textAlign: 'center' }}>
      <h1>📈 AlphaAIStockX</h1>
      <p style={{ fontSize: '1.2rem' }}>Your AI-powered stock research assistant.</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>✅ Live Stock Recommendations</li>
        <li>✅ Market Sentiment Analysis</li>
        <li>✅ AI-Powered Predictions</li>
        <li>✅ Works on Desktop and Mobile</li>
      </ul>
      <p style={{ marginTop: '2rem' }}>
        Visit the original repo on{' '}
        <a
          href="https://github.com/JWKLINEHaCk3r/AlphaAIStockX"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>
    </div>
  );
};

export default App;
