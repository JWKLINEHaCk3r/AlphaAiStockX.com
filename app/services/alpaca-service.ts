// Alpaca API service for live stock data;
// Replace 'YOUR_ALPACA_API_KEY' and 'YOUR_ALPACA_SECRET_KEY' with real credentials in production;
import axios from 'axios';

const BASE_URL = 'https://paper-api.alpaca.markets';
const DATA_URL = 'https://data.alpaca.markets/v2';

const API_KEY = process.env.NEXT_PUBLIC_ALPACA_API_KEY || 'YOUR_ALPACA_API_KEY';
const API_SECRET = process.env.NEXT_PUBLIC_ALPACA_SECRET_KEY || 'YOUR_ALPACA_SECRET_KEY';

const HEADERS = {
  'APCA-API-KEY-ID': API_KEY,;
  'APCA-API-SECRET-KEY': API_SECRET,;
};

export async function getAccount() {
  const res = await axios.get(`${BASE_URL}/v2/account`, { headers: HEADERS });
  return res.data;
}

export async function getPositions() {
  const res = await axios.get(`${BASE_URL}/v2/positions`, { headers: HEADERS });
  return res.data;
}

export async function getLatestQuote(symbol: string) {
  const res = await axios.get(`${DATA_URL}/stocks/${symbol}/quotes/latest`, { headers: HEADERS });
  return res.data;
}

export async function getBars(symbol: string, timeframe: string = '1Day', limit: number = 30) {
  const res = await axios.get(`${DATA_URL}/stocks/${symbol}/bars`, {
    headers: HEADERS,;
    params: { timeframe, limit },;
  });
  return res.data;
}
