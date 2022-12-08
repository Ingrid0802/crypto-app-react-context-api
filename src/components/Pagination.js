import React from "react";
import "./Pagination.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useGlobalContext } from "../context";

const Pagination = () => {
  const { page, setPage, totalPages, noItems } = useGlobalContext();
  const totalNumber = Math.ceil(totalPages / noItems);
  const next = () => {
    if (page === totalNumber) {
      return null;
    } else {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  };

  const setTotalPages = () => {
    setPage(totalNumber);
  };

  const multiStepNext = () => {
    if (page + 3 >= totalNumber) {
      setPage(totalNumber - 1);
    } else {
      setPage(page + 3);
    }
  };

  const multiStepPrev = () => {
    if (page - 3 <= 1) {
      setPage(totalNumber + 1);
    } else {
      setPage(page - 2);
    }
  };

  return (
    <div className='pagination'>
      <ul>
        <div className='pagination-list'>
          <li>
            <button className='pagination-button' onClick={prev}>
              <AiOutlineArrowLeft />
            </button>
          </li>
          {page + 1 === totalNumber || page === totalNumber ? (
            <li>
              <button className='pagination-button' onClick={multiStepPrev}>
                ...
              </button>
            </li>
          ) : null}
          {page - 1 !== 0 ? (
            <li>
              <button className='pagination-button' onClick={prev}>
                {page - 1}
              </button>
            </li>
          ) : null}

          <li>
            <button disabled className='pagination-button'>
              {page}
            </button>
          </li>
          {page + 1 !== totalNumber && page !== totalNumber ? (
            <li>
              <button className='pagination-button' onClick={next}>
                {page + 1}
              </button>
            </li>
          ) : null}

          {page + 1 !== totalNumber && page !== totalNumber ? (
            <li>
              <button className='pagination-button' onClick={multiStepNext}>
                ...
              </button>
            </li>
          ) : null}

          {page !== totalNumber ? (
            <li>
              <button className='pagination-button' onClick={setTotalPages}>
                {totalNumber}
              </button>
            </li>
          ) : null}

          <li>
            <button className='pagination-button' onClick={next}>
              <AiOutlineArrowRight size='1em' />
            </button>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Pagination;
