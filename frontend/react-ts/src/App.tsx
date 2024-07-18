import React, { useEffect, useState } from 'react';
import api from './services/api';

interface Book {
  title: string;
  author: string
}

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [newBook, setNewBook] = useState<Book>({title: "", author: ""});
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    api.get('/')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      fetchBooks();
  }, []);

  const fetchBooks = () => {
    api.get("/books")
    .then(response => {
      setBooks(response.data)
    })
    .catch(error => {
      console.error("Error fetching books", error)
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setNewBook(prevBook => ({
      ...prevBook,
      [name]: value
    }));
  };

  const addNewBook = () => {
    api.post('/books', newBook)
      .then(response => {
        console.log("Book added: ", response.data)
        fetchBooks()

        setNewBook({title: "", author: ""})
      })
      .catch(error => {
        console.error("Error adding book: ", error)
      })
  }

  return (
    <div>
      <h1>{message}</h1>

      <input
        name="title"
        placeholder='Title'
        value={newBook.title}
        onChange={handleInputChange}
      />

      <input
        name="author"
        placeholder='Author'
        value={newBook.author}
        onChange={handleInputChange}
      />

      <button onClick={addNewBook}>Send</button>

      <h2>Books List</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
