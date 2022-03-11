import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  Form,
  FloatingLabel,
  Button,
  Row,
  Col,
  Container,
} from 'react-bootstrap';
import Pagination from 'react-bootstrap-4-pagination';
import BooksContainer from '../components/BooksContainer';
import axios from 'axios';

const PAGE_SIZE = 9;

export default function BookSearch() {
  const keywordsRef = useRef();
  const titleRef = useRef();
  const authorRef = useRef();
  const [books, setBooks] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchBooks = useCallback(() => {
    const getPageStartIndex = () => {
      return (pageNumber - 1) * PAGE_SIZE;
    };
    let bodyObject = {
      keywords: keywordsRef.current.value,
      author: authorRef.current.value,
      title: titleRef.current.value,
      startIndex: getPageStartIndex(),
    };
    try {
      axios.post('api/bookSearch', bodyObject).then((res) => {
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
      <Container className="m-3">
        <Form onSubmit={handleSubmit}>
          <Row className="g-2">
            <Col md>
              <Form.Group id="keywords">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Keywords"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Keywords"
                    ref={keywordsRef}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group id="title">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Title"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    ref={titleRef}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group id="author">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Author"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Author"
                    ref={authorRef}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>

          <Button className="w-100" type="submit">
            Search Books
          </Button>
        </Form>
      </Container>
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
