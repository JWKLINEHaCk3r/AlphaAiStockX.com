"use client"

import { useState } from "react"

const StockSearch = ({ onSearch }) => {
  const [ticker, setTicker] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (ticker.trim()) {
      onSearch(ticker.toUpperCase())
    }
  }

  return (
    <div className="stock-search">
      <h2>Search for a Stock</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter stock ticker (e.g., AAPL)"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Analyze
        </button>
      </form>
    </div>
  )
}

export default StockSearch
