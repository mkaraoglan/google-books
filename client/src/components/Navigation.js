import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

export default function Navigation() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Google Books Api</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/booksearch">Book Search</Nav.Link>
          <Nav.Link href="/bookmarks">Booksmark</Nav.Link>
        </Nav>
        <Navbar.Toggle />
      </Container>
    </Navbar>
  );
}
