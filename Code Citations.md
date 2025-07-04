# Code Citations and Attributions

## AlphaAI StockX Trading Platform

This document provides citations and attributions for external libraries, APIs, and code references used in the AlphaAI StockX trading platform.

### Core Framework & Libraries

#### Next.js & React

- **Next.js 14** - Full-stack React framework
  - Source: <https://nextjs.org/>
  - License: MIT
  - Used for: Application framework, routing, SSG/SSR

- **React 18** - JavaScript library for building user interfaces
  - Source: <https://reactjs.org/>
  - License: MIT
  - Used for: Component-based UI development

#### UI Components & Styling

- **Tailwind CSS** - Utility-first CSS framework
  - Source: <https://tailwindcss.com/>
  - License: MIT
  - Used for: Styling and responsive design

- **Radix UI** - Low-level UI primitives
  - Source: <https://www.radix-ui.com/>
  - License: MIT
  - Used for: Accessible UI components (Button, Input, Card, etc.)

- **Lucide React** - Icon library
  - Source: <https://lucide.dev/>
  - License: ISC
  - Used for: Icons throughout the application

#### TypeScript

- **TypeScript** - Typed superset of JavaScript
  - Source: <https://www.typescriptlang.org/>
  - License: Apache 2.0
  - Used for: Type safety and developer experience

### Trading & Financial Libraries

#### Chart Libraries

- **Chart.js** - Canvas-based charting library
  - Source: <https://www.chartjs.org/>
  - License: MIT
  - Used for: Financial charts and data visualization

- **React Chart.js 2** - React wrapper for Chart.js
  - Source: <https://react-chartjs-2.js.org/>
  - License: MIT
  - Used for: React integration of charts

#### Data Processing

- **Lodash** - JavaScript utility library
  - Source: <https://lodash.com/>
  - License: MIT
  - Used for: Data manipulation and utility functions

### Development Tools

#### Build Tools

- **Webpack** - Module bundler (via Next.js)
  - Source: <https://webpack.js.org/>
  - License: MIT
  - Used for: Asset bundling and optimization

- **Babel** - JavaScript compiler (via Next.js)
  - Source: <https://babeljs.io/>
  - License: MIT
  - Used for: JavaScript transpilation

#### Code Quality

- **ESLint** - JavaScript linter
  - Source: <https://eslint.org/>
  - License: MIT
  - Used for: Code quality and consistency

- **Prettier** - Code formatter
  - Source: <https://prettier.io/>
  - License: MIT
  - Used for: Code formatting

### Deployment & Infrastructure

#### Netlify

- **Netlify** - Static site hosting and deployment
  - Source: <https://netlify.com/>
  - License: Commercial
  - Used for: Application hosting and CI/CD

### AI & Machine Learning Concepts

#### Technical Analysis Algorithms

- **RSI (Relative Strength Index)** - Technical indicator
  - Reference: J. Welles Wilder Jr. "New Concepts in Technical Trading Systems" (1978)
  - Used for: Momentum analysis in trading algorithms

- **MACD (Moving Average Convergence Divergence)** - Technical indicator
  - Reference: Gerald Appel's development in the 1960s
  - Used for: Trend following and momentum analysis

- **Bollinger Bands** - Volatility indicator
  - Reference: John Bollinger (1980s)
  - Used for: Volatility and price level analysis

#### Portfolio Theory

- **Modern Portfolio Theory** - Portfolio optimization
  - Reference: Harry Markowitz (1952) "Portfolio Selection"
  - Used for: Portfolio optimization algorithms

- **Sharpe Ratio** - Risk-adjusted return measure
  - Reference: William F. Sharpe (1966)
  - Used for: Performance evaluation

### API References

#### Financial Data APIs (Conceptual)

- Market data integration patterns based on:
  - Alpha Vantage API documentation
  - Yahoo Finance API patterns
  - IEX Cloud API structure

#### Real-time Data

- WebSocket implementation patterns for real-time data
- Event-driven architecture for live updates

### Security & Best Practices

#### Authentication & Security

- Security headers implementation following OWASP guidelines
- Content Security Policy (CSP) based on Mozilla recommendations
- JWT token patterns for session management

### Custom Implementation

#### AI Trading Engine

- **Custom AI Brain Service** - Proprietary implementation
  - Original development for AlphaAI StockX
  - Combines multiple trading strategies and sentiment analysis

- **Pattern Recognition** - Custom algorithms
  - Original technical analysis pattern detection
  - Machine learning model integration patterns

#### Risk Management

- **Custom Risk Assessment** - Proprietary algorithms
  - Value at Risk (VaR) calculations
  - Portfolio correlation analysis
  - Dynamic position sizing

### Open Source Contributions

This project may contribute back to the open source community through:

- Bug reports and fixes to dependencies
- Documentation improvements
- Performance optimizations
- Community engagement

### License Compliance

All external dependencies are used in compliance with their respective licenses:

- MIT licensed components are used with proper attribution
- Commercial licenses are properly acquired where required
- No GPL-licensed code is included to maintain proprietary flexibility

### Disclaimer

This platform is for educational and research purposes. Trading involves substantial risk and past performance does not guarantee future results. All financial data and trading signals should be verified independently.

### Contact

For questions about code attribution or licensing:

- Email: <legal@alphaaistockx.com>
- Technical: <tech@alphaaistockx.com>

---

**Last Updated:** July 4, 2025
**Version:** 1.0.0
