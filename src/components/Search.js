import React from "react";
import { BiSearch } from "react-icons/bi";
import "./Search.css";
import Filter from "./CurrencyFilter.js";
import { useGlobalContext } from "../context";
import OrderFilter from "./OrderFilter";
import PerPageFilter from "./PerPageFilter";

const Search = () => {
  const { query, setQuery, getSearchedCrypto } = useGlobalContext();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChangeSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleCryptoSubmit = () => {
    getSearchedCrypto();
  };

  return (
    <>
      <div className='filters'>
        <div className='form-container'>
          <form onSubmit={handleSubmit}>
            <div className='box'>
              <input
                type='text'
                placeholder='Search'
                className='input-search'
                onChange={handleChangeSearch}
                value={query}
              />
              <button
                type='submit'
                className='btn-submit'
                onClick={handleCryptoSubmit}
              >
                <BiSearch />
              </button>
            </div>
          </form>
        </div>
        <div className='container-filters'>
          <Filter />
          <PerPageFilter />
          <OrderFilter />
        </div>
      </div>
    </>
  );
};

export default Search;
