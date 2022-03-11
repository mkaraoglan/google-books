import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookSearch from './pages/BookSearch';
import Bookmarks from './pages/Bookmarks';

function App() {
  // useEffect(() => {
  //   fetchApi();
  // }, []);

  // const fetchApi = () => {
  //   axios.get('/api').then((res) => {
  //     console.log('Fetchapi');
  //     console.log(res.data);
  //   });
  // };
  return (
    <>
      <Container>
        <div>
          <Router>
            <Routes>
              {/* <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
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
