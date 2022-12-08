import React from "react";
import "./Cryptolist.css";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

const Cryptolist = () => {
  const { cryptoData, currency } = useGlobalContext();

  const changeColor = (value) => {
    if (value < 0) {
      return "crypto-red";
    } else if (value > 0) {
      return "crypto-green";
    } else {
      return "crypto-white";
    }
  };

  return (
    <div className='list'>
      <table>
        <thead>
          <tr>
            <th>Asset</th>
            <th>Name</th>
            <th>Price</th>
            <th>Total Volume</th>
            <th>Market Cap Change</th>
            <th>1H</th>
            <th>24H</th>
            <th>7D</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((crypto) => (
            <tr key={crypto.id}>
              <td>
                <Link className='coin-link' to={`/coins/${crypto.id}`}>
                  <img
                    src={crypto.image}
                    alt={crypto.name}
                    className='crypto-img'
                  />
                  <p className='symbol'>{crypto.symbol}</p>
                </Link>
              </td>
              <td>{crypto.name}</td>
              <td>
                {crypto.current_price
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: currency,
                    }).format(crypto.current_price)
                  : ""}
              </td>
              <td>{crypto.total_volume}</td>
              <td
                className={changeColor(crypto.market_cap_change_percentage_24h)}
              >
                {crypto.market_cap_change_percentage_24h?.toFixed(2)}{" "}
                {crypto.market_cap_change_percentage_24h !== null ? "%" : ""}
              </td>
              <td
                className={changeColor(
                  crypto.price_change_percentage_1h_in_currency
                )}
              >
                {crypto.price_change_percentage_1h_in_currency?.toFixed(2)}
              </td>
              <td
                className={changeColor(
                  crypto.price_change_percentage_24h_in_currency
                )}
              >
                {crypto.price_change_percentage_24h_in_currency?.toFixed(2)}
              </td>
              <td
                className={changeColor(
                  crypto.price_change_percentage_7d_in_currency
                )}
              >
                {crypto.price_change_percentage_7d_in_currency?.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cryptolist;
