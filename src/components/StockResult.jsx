const StockResult = ({ ticker }) => {
  // This would normally fetch real data from an API
  const mockData = {
    price: "$" + (Math.random() * 1000).toFixed(2),
    change: (Math.random() * 10 - 5).toFixed(2) + "%",
    sentiment: ["Bullish", "Bearish", "Neutral"][Math.floor(Math.random() * 3)],
    recommendation: ["Strong Buy", "Buy", "Hold", "Sell", "Strong Sell"][Math.floor(Math.random() * 5)],
  }

  return ticker ? (
    <div className="stock-result">
      <h2>{ticker} Analysis</h2>
      <div className="result-card">
        <div className="result-item">
          <span className="label">Current Price:</span>
          <span className="value">{mockData.price}</span>
        </div>
        <div className="result-item">
          <span className="label">Daily Change:</span>
          <span className={`value ${Number.parseFloat(mockData.change) >= 0 ? "positive" : "negative"}`}>
            {mockData.change}
          </span>
        </div>
        <div className="result-item">
          <span className="label">AI Sentiment:</span>
          <span className="value">{mockData.sentiment}</span>
        </div>
        <div className="result-item">
          <span className="label">Recommendation:</span>
          <span className="value recommendation">{mockData.recommendation}</span>
        </div>
      </div>
      <p className="disclaimer">Note: This is simulated data for demonstration purposes.</p>
    </div>
  ) : null
}

export default StockResult
