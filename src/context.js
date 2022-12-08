import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [query, setQuery] = useState("");
  const [currency, setCurrency] = useState("eur");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(250);
  const [noItems, setNoItems] = useState(10);
  const [coinData, setCoinData] = useState({});

  const getCryptoData = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${sortBy}&per_page=${noItems}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      );
      setCryptoData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCryptoData();
  }, [query.length === 0, currency, sortBy, page, noItems]);

  const getTotalCrypto = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/list`
      );
      setTotalPages(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalCrypto();
  }, []);

  const getSearchedCrypto = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${query}&order=${sortBy}&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      );
      if (query.length > 0) {
        setCryptoData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchedCrypto();
  }, []);

  const getCoinDetails = async (coinId) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
      );
      setCoinData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        cryptoData,
        query,
        setQuery,
        getSearchedCrypto,
        getCryptoData,
        setCurrency,
        currency,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        setTotalPages,
        noItems,
        setNoItems,
        coinData,
        getCoinDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
