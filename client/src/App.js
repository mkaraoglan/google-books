import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookSearch from './pages/BookSearch';
import Bookmarks from './pages/Bookmarks';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Container>
        <div>
          <Router>
            <Routes>
              <Route path="//" element={<Home />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/booksearch" element={<BookSearch />} />
            </Routes>
          </Router>
        </div>
      </Container>
    </>
  );
}

export default App;
