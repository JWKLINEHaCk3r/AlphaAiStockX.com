"use client"

import { useState } from "react"
import Header from "./components/Header"
import FeatureList from "./components/FeatureList"
import StockSearch from "./components/StockSearch"
import StockResult from "./components/StockResult"
import "./styles.css"

const App = () => {
  const [searchedTicker, setSearchedTicker] = useState("")

  const handleSearch = (ticker) => {
    setSearchedTicker(ticker)
  }

  return (
    <div className="app-container">
      <Header />
      <FeatureList />
      <StockSearch onSearch={handleSearch} />
      <StockResult ticker={searchedTicker} />
      <footer className="app-footer">
        <p>
          Visit the original repo on{" "}
          <a href="https://github.com/JWKLINEHaCk3r/AlphaAIStockX" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
