import React from "react";
import Cryptolist from "../components/Cryptolist";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className='crypto-list'>
      <Search />
      <Cryptolist />
      <Pagination />
      <Outlet />
    </div>
  );
};

export default Home;
