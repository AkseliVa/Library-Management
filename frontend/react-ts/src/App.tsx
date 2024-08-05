import React, { useEffect, useState } from 'react';
import api from './services/api';
import './App.css';

interface Book {
  _id?: string;
  title: string;
  author: string
}

const App: React.FC = () => {
  const [newBook, setNewBook] = useState<Book>({title: "", author: ""});
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    api.get('/')
      .then(response => {
        console.log(response.data);
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

  const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addNewBook();
    }
  }

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

  const deleteBook = (id: String) => {
    api.delete(`/book/${id}`)
    .then(response => {
      fetchBooks();
      console.log("Book deleted: ", response.data)
    })
    .catch(error => {
      console.error("Error deleting book: ", error)
    })
  }

  return (
    <div className='container'>
      <h1>Library Management</h1>

      <input
        name="title"
        placeholder='Title'
        value={newBook.title}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />

      <input
        name="author"
        placeholder='Author'
        value={newBook.author}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />

      <button onClick={addNewBook}>Send</button>

      <h2>Books List</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <b>{book.title}</b> by <b>{book.author}</b>
            <button className='delete' onClick={() => deleteBook(book._id!)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
