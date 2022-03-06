import axios from 'axios';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = () => {
    axios.get('/api').then((res) => {
      console.log('Fetchapi');
      console.log(res.data);
    });
  };
  return <div className="App">Hello World!</div>;
}

export default App;
