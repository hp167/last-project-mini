import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
    description: ""
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const res = await axios.get(
      "http://localhost:5000/books"
    );
    setBooks(res.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(
        `http://localhost:5000/books/${editId}`,
        form
      );
      setEditId(null);
    } else {
      await axios.post(
        "http://localhost:5000/books",
        form
      );
    }

    setForm({
      title: "",
      author: "",
      genre: "",
      price: "",
      description: ""
    });

    getBooks();
  };

  const editBook = (book) => {
    setForm(book);
    setEditId(book._id);
  };

  const deleteBook = async (id) => {
    if (window.confirm("Delete this book?")) {
      await axios.delete(
        `http://localhost:5000/books/${id}`
      );
      getBooks();
    }
  };

  return (
    <div className="container">
      <h1>Book Store</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />

        <input
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit">
          {editId ? "Update Book" : "Add Book"}
        </button>
      </form>

      <div className="books">
        {books.map((book) => (
          <div className="card" key={book._id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Price: ₹{book.price}</p>
            <p>{book.description}</p>

            <button onClick={() => editBook(book)}>
              Edit
            </button>

            <button
              onClick={() => deleteBook(book._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
