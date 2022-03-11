import React, { useEffect, useState } from 'react';
import { StyledCard } from './styles/BookContainer.styled';
import noPicture from '../img/noPicture.png';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const BooksContainer = ({ bookProps }, props) => {
  const [books, setBooks] = useState([]);

  const queryApi = '/api/bookmarks';

  const addBookmark = (book) => {
    axios.post(queryApi + '/addBookmark/', { book }).then(function () {
      book.bookmarked = true;
      let _book = document.getElementById(book.id);
      _book.textContent = 'Delete Bookmark';
    });
  };

  const deleteBookmark = (book) => {
    axios.delete(queryApi, { data: { bookId: book.bookId } }).then(function () {
      book.bookmarked = false;
      let _book = document.getElementById(book.id);
      _book.textContent = 'Add Bookmark';
    });
  };

  const changeBookmarkStatus = (book) => {
    let isMarked = book.bookmarked;

    if (isMarked) {
      deleteBookmark(book);
    } else {
      addBookmark(book);
    }
  };

  const shortenDescription = (desc) => {
    if (desc) {
      desc = desc.substring(0, 120);
      desc += '...';
    }
    return desc;
  };

  useEffect(() => {
    setBooks(bookProps);
  }, [bookProps]);

  useEffect(() => {}, []);
  return (
    <>
      <StyledCard>
        {books.map((book, idx) => (
          <div key={idx}>
            <div className="book">
              <img
                alt=""
                variant="top"
                src={book.imageLinks ? book.imageLinks : noPicture}
              />

              <div className="bookInfo">
                <h6>{book.title}</h6>
                <p>{shortenDescription(book.description)}</p>
                <Button
                  className="bookmarkBtn"
                  id={book.id}
                  onClick={() => {
                    changeBookmarkStatus(book);
                  }}
                >
                  {!book.bookmarked ? 'Add Bookmark' : 'Delete Bookmark'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </StyledCard>
    </>
  );
};

export default BooksContainer;
