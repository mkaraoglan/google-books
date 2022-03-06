import React, { useEffect, useRef, useState } from 'react';
import { Form, FloatingLabel, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { AppPagination } from './Pagination';

const PAGE_SIZE = 9;

export default function BookSearch() {
  const keywordsRef = useRef();
  const titleRef = useRef();
  const authorRef = useRef();
  const [books, setBooks] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchGoogleApi();
  }, [pageNumber]);

  const fetchGoogleApi = () => {
    const queryApi =
      googleApi() +
      `"${keywordsRef.current.value}"+inauthor:"${authorRef.current.value}"+intitle:"${titleRef.current.value}"`;

    try {
      axios.get(queryApi).then((res) => {
        setBooks(res.data.items);
        setTotalItems(res.data.totalItems);
      });
    } catch {
      console.error('Failed to log in');
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    fetchGoogleApi();
  }

  const getTotalPage = () => {
    return Math.ceil(totalItems / PAGE_SIZE);
  };

  const googleApi = () => {
    return `https://www.googleapis.com/books/v1/volumes?startIndex=${getPageStartIndex()}&maxResults=${PAGE_SIZE}&q=`;
  };

  const getPageStartIndex = () => {
    return (pageNumber - 1) * PAGE_SIZE;
  };

  return (
    <>
      <Card>
        <Card.Body>
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
        </Card.Body>
      </Card>
      {totalItems ? (
        <>
          <Row xs={1} md={3} className="g-4">
            {books.map((book, idx) => (
              <Col key={idx}>
                <Card>
                  <Card.Img variant="top" src="holder.js/100px160" />
                  <Card.Body>
                    <Card.Title>{book.volumeInfo.title}</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div>
            <AppPagination
              active={pageNumber}
              totalPage={getTotalPage()}
              paginationItemClicked={(pageNum) => setPageNumber(pageNum)}
            ></AppPagination>
            <br />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
