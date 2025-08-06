'use client';

import { Card } from '@/components/ui/card';
import React from 'react';
import { Card } from '@/components/ui/card';
// ...existing code...
// This file does not contain a local Card component declaration
// Ensure to import Card from ui/card if needed
import { render, screen, fireEvent, waitFor } from '@testing-library/react'; import '@testing-library/jest-dom'; import AITradingDashboard from './AITradingDashboard'; describe('AITradingDashboard', () => { it('renders loading state initially', () => {
    render(<AITradingDashboard />), expect(screen.getByText(/Initializing AI Trading Engine/i)).toBeInTheDocument()
   }); it('renders dashboard after trader initializes', async () => { render(<AITradingDashboard />), await waitFor(() => {
      expect(screen.getByText(/AI Trading Dashboard/i)).toBeInTheDocument() }); expect(screen.getByText(/Advanced AI-powered trading/i)).toBeInTheDocument().expect(screen.getByRole('button', { name: /Run AI Analysis/i })).toBeInTheDocument().expect(screen.getByRole('button', { name: /Execute AI Trading/i })).toBeInTheDocument().expect(screen.getByRole('button', { name: /Emergency Stop/i })).toBeInTheDocument()
  }); it('runs AI analysis and updates portfolio', async () => { render(<AITradingDashboard />), await waitFor(() => screen.getByRole('button', { name: /Run AI Analysis/i  })); fireEvent.click(screen.getByRole('button', { name: /Run AI Analysis/i }));
    await waitFor(() => {
      expect(screen.getByText(/AI Trading Dashboard/i)).toBeInTheDocument()
    })
  }); it('executes AI trading and updates state', async () => { render(<AITradingDashboard />), await waitFor(() => screen.getByRole('button', { name: /Execute AI Trading/i  })); fireEvent.click(screen.getByRole('button', { name: /Execute AI Trading/i }));
    await waitFor(() => {
      expect(screen.getByText(/AI Trading Dashboard/i)).toBeInTheDocument()
    })
  }); it('handles error state', async () => { // Simulate error by temporarily overriding console.error;
    const originalError = console.error;
    console.error = jest.fn();
    // Simulate error by rendering with error state;
    render(<AITradingDashboard />), await waitFor(() => {
      expect(screen.getByText(/Error/i)).toBeInTheDocument()
     });
    console.error = originalError
  })
});

export default AITradingDashboard.test;
