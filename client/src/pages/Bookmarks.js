import React, { useState, useCallback, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Pagination from 'react-bootstrap-4-pagination';
import BooksContainer from '../components/BooksContainer';
import axios from 'axios';

const PAGE_SIZE = 9;

export default function BookSearch() {
  const [books, setBooks] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchBooks = useCallback(() => {
    const getPageStartIndex = () => {
      return (pageNumber - 1) * PAGE_SIZE;
    };
    let bodyObject = {
      startIndex: getPageStartIndex(),
    };
    try {
      axios.get('api/bookmarks/allBookmarks', bodyObject).then((res) => {
        setTotalItems(res.data.totalItems);
        if (res.data.totalItems) {
          setBooks(res.data.items);
        } else {
          setBooks([]);
        }
      });
    } catch {
      console.error('Failed to log in');
    }
  }, [pageNumber]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  async function handleSubmit(e) {
    e.preventDefault();
    fetchBooks();
  }

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
