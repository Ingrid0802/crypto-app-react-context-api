import React, { useEffect } from "react";
import * as ReactDOM from "react-dom";
import "./CryptoDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import Chart from "./Chart";

const CryptoDetails = () => {
  const { getCoinDetails, coinData, currency } = useGlobalContext();
  const { coinId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCoinDetails(coinId);
  }, [coinId]);

  const close = () => {
    navigate("..");
  };

  const returnCurrencyFormat = (value) => {
    if (value) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(value[currency]);
    } else {
      return null;
    }
  };

  const returnPercentageColor = (value) => {
    if (value < 0) {
      return "negative-value";
    }
    return "positive-value";
  };

  const returnIconBasedOnPercentage = (value) => {
    if (value < 0) {
      return <AiOutlineArrowDown style={{ marginLeft: "0.3em" }} />;
    }
    return <AiOutlineArrowUp style={{ marginLeft: "0.3em" }} />;
  };

  return ReactDOM.createPortal(
    <div className='modal-window' onClick={close}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <img
            className='modal-crypto-img'
            src={coinData.image?.large}
            alt={coinData.name}
          />
          <h1>{coinData.name}</h1>
          <h2 className='modal-crypto-symbol'>
            {coinData.symbol?.toUpperCase()}
          </h2>
        </div>
        <div className='chart-data'>
          <Chart id={coinId} />
        </div>
        {coinData ? (
          <div className='modal-details'>
            <div className='price-percentage'>
              <p className='crypto-price'>Price in last 24h</p>
              <span
                className={returnPercentageColor(
                  coinData.market_data?.price_change_percentage_24h
                )}
              >
                {Number(
                  coinData.market_data?.price_change_percentage_24h
                ).toFixed(2) || ""}
                {coinData.market_data?.price_change_percentage_24h ? "%" : ""}
                {returnIconBasedOnPercentage(
                  coinData.market_data?.price_change_percentage_24h
                )}
              </span>
            </div>
            <div className='price'>
              <p className='crypto-price'>Price</p>
              <h3>
                {returnCurrencyFormat(coinData.market_data?.current_price)}
              </h3>
            </div>
            <div className='market-cap'>
              <span>Market Cap</span>
              <h3>{returnCurrencyFormat(coinData.market_data?.market_cap)}</h3>
            </div>
            <div className='total-volume'>
              <span>Total Volume</span>
              <h3>
                {returnCurrencyFormat(coinData.market_data?.total_volume)}
              </h3>
            </div>
            <div className='diluted'>
              <span>Fully Diluted Valuation</span>
              <h3>
                {returnCurrencyFormat(
                  coinData.market_data?.fully_diluted_valuation
                )}
              </h3>
            </div>
          </div>
        ) : null}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default CryptoDetails;
