import { useEffect, useState } from 'react';
import BookList from './components/BookList';
import Form from './components/Form';
import './styles/styles.css';
import BookServices from './services/BookServices';

function App() {
  const [booklist, setBooklist] = useState([])

  useEffect(() => {
    BookServices.getAllBooks().then((res) => {
      console.log(res)
      setBooklist(res.data)
    })
  }, [])
  return (
    <div className="app">
      <h1>Book Management System</h1>

      <Form booklist={booklist} setBooklist={setBooklist}/>
      <BookList booklist={booklist} setBooklist={setBooklist}/>
    </div>
  );
}

export default App;
