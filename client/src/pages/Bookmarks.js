import React, { useState, useCallback, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Pagination from 'react-bootstrap-4-pagination';
import BooksContainer from '../components/BooksContainer';
import axios from 'axios';

const PAGE_SIZE = 9;

export default function BookMarks() {
  const [books, setBooks] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    try {
      axios.get('api/bookmarks/allBookmarks').then((res) => {
        setTotalItems(res.data.totalItems);
        if (res.data.totalItems > 0) {
          let booksReturn = res.data.items;
          setBooks(booksReturn);
        } else {
          setBooks([]);
        }
      });
    } catch {
      console.error('Failed to log in');
    }
  }, [pageNumber]);

  const getTotalPage = () => {
    return Math.ceil(totalItems / PAGE_SIZE);
  };

  let paginationConfig = {
    totalPages: getTotalPage(),
    currentPage: pageNumber,
    showMax: 5,
    threeDots: false,
    prevNext: true,
    onClick: function (page) {
      setPageNumber(page);
    },
  };

  return (
    <>
      {totalItems ? (
        <Container className="m-3">
          <BooksContainer bookProps={books} />
          <div>
            <Pagination {...paginationConfig} />
            <br />
          </div>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
}
