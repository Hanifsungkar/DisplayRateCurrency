import {useState, useEffect} from 'react';
import React from 'react';
import'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
const [currency, setCurrency] = useState([])

  useEffect(() => {
    fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=a7c0a80201a94b33a27bf10031914382&symbols=CAD,IDR,JPY,CHF,EUR,GBP")
    .then((response) => response.json())
    .then((currency) => setCurrency(currency))
  })

  return (
    <div className="container">
            <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Currency</th>
                    <th scope="col">We Buy</th>
                    <th scope="col">Exchange Rate</th>
                    <th scope="col">We Sell</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    currency.map((currency, index) => (
                  <tr key={index}>
                    <th scope="row"></th>
                    <td>{currency.symbols}</td>
                    <td></td>
                    <td>{currency.rates}</td>
                    <td></td>
                  </tr>
                    ))
                  }
                </tbody>
              </table>
                <p className="h-100 d-flex justify-content-center align-items-center">Rate are based on 1 USD</p>
                <p className="h-100 d-flex justify-content-center align-items-center">This application uses API from https://currencyfreaks.com/</p>
        </div>
  )
}