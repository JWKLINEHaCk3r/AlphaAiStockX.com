const FeatureList = () => {
  const features = [
    "Live Stock Recommendations",
    "Market Sentiment Analysis",
    "AI-Powered Predictions",
    "Works on Desktop and Mobile",
  ]

  return (
    <ul className="feature-list">
      {features.map((feature, index) => (
        <li key={index}>✅ {feature}</li>
      ))}
    </ul>
  )
}

export default FeatureList
