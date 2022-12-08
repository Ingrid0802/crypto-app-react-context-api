import React, { useRef } from "react";
import "./CurrencyFilter.css";
import { useGlobalContext } from "../context";
import { MdInput } from "react-icons/md";

const Filter = () => {
  const { setCurrency } = useGlobalContext();
  const currencyRef = useRef(null);

  const hadleCurrencySubmit = (e) => {
    e.preventDefault();
    let val = currencyRef.current.value;
    setCurrency(val);
  };

  return (
    <div className='currency-filter-container'>
      <form onSubmit={hadleCurrencySubmit}>
        <div className='box-filter'>
          <label className='currency-label'>Currency</label>
          <input type='text' placeholder='eur' ref={currencyRef} />
          <button
            type='submit'
            className='currency-btn'
            onSubmit={hadleCurrencySubmit}
          >
            <MdInput size='2em' />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
