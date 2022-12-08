import React from "react";
import "./OrderFilter.css";
import { useGlobalContext } from "../context";

const OrderFilter = () => {
  const { setSortBy } = useGlobalContext();

  const handleSort = (e) => {
    e.preventDefault();
    setSortBy(e.target.value);
  };

  return (
    <div className='order-filter'>
      <label>
        <span className='sort-span'>Sort by</span>
        <select name='sortby' className='sortby' onClick={handleSort}>
          <option value='market_cap_desc'>market cap desc</option>
          <option value='market_cap_asc'>market cap asc</option>
          <option value='volume_desc'>volume desc</option>
          <option value='volume_asc'>volume asc</option>
          <option value='id_desc'>id desc</option>
          <option value='id_asc'>id asc</option>
          <option value='gecko_desc'>gecko desc</option>
          <option value='gecko_asc'>gecko asc</option>
        </select>
      </label>
    </div>
  );
};

export default OrderFilter;
