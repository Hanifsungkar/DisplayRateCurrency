import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const App = () => {
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(true);
    const currencies = ["CAD", "IDR", "JPY", "CHF", "EUR", "GBP"];

    useEffect(() => {
      const fetchRates = async () => {
        try {
          const response = await axios.get(
            'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=a7c0a80201a94b33a27bf10031914382&symbols=CAD,IDR,JPY,CHF,EUR,GBP',
            {
              params: {
                apikey: 'a7c0a80201a94b33a27bf10031914382',
              },
            }
          );

          const fetchedRates = currencies.map((currency) => ({
            currency,
            exchangeRate: parseFloat(response.data.rates[currency]),
            weBuy: parseFloat(response.data.rates[currency]) * 1.05,
            weSell: parseFloat(response.data.rates[currency]) * 0.95,
          }));

          setRates(fetchedRates);
        } catch (error) {
          console.error('Error fetching rates:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchRates();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Currency Exchange Rates</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => (
            <tr key={rate.currency}>
              <td>{rate.currency}</td>
              <td>{rate.weBuy.toFixed(2)}</td>
              <td>{rate.exchangeRate.toFixed(2)}</td>
              <td>{rate.weSell.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
}

export default App;
