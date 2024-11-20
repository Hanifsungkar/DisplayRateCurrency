import React from 'react';
import { useEffect, useState } from 'react'; 
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

 const App = () => {
   const Rates = () => {
     const [rates, setRates] = useState([]);
     const currencies = ["CAD", "IDR", "JPY", "CHF", "EUR", "GBP"];

     useEffect(() => {
       const fetchRates = async () => {
         try {
           const response = axios.get(
             'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=a7c0a80201a94b33a27bf10031914382&symbols=CAD,IDR,JPY,CHF,EUR,GBP',
             {
               params: {
                 'apikey': 'a7c0a80201a94b33a27bf10031914382',
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
         } 
       };

       fetchRates();
   }, []);

  return (
<div>
       <h1>Currency Exchange Rates</h1>
       <table className='table table-striped'>
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
      <p className="h-100 d-flex justify-content-center align-items-center">Rate are based on 1 USD</p>
      <p className="h-100 d-flex justify-content-center align-items-center">This application uses API from https://currencyfreaks.com/</p>

    </div>
   );
 };
 }

 export default App;