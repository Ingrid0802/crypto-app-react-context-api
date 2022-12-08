import React, { useRef } from "react";
import { useGlobalContext } from "../context";
import "./PerPageFilter.css";

const PerPageFilter = () => {
  const itemsRef = useRef(null);
  const { setNoItems } = useGlobalContext();

  const hadleCurrencySubmit = (e) => {
    e.preventDefault();
    let val = itemsRef.current.value;
    if (val >= 1 || val <= 250) {
      setNoItems(val);
    }
    itemsRef.current.value = "";
  };

  return (
    <div>
      <form onSubmit={hadleCurrencySubmit}>
        <div className='box-filter'>
          <label className='currency-label'>Items</label>
          <input
            className='per-page-input'
            type='number'
            placeholder='10'
            ref={itemsRef}
            min={1}
            max={250}
          />
        </div>
      </form>
    </div>
  );
};

export default PerPageFilter;
