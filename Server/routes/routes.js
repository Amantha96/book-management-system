const express = require("express");
const router = express.Router();
const Book = require("../models/book");

// API endpoints
// get all books
router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// add new book
router.post("/add-new-book", async (req, res) => {
  try {
    const existingBook = await Book.findOne({ isbn: req.body.isbn });

    if (!existingBook) {
      const book = new Book({
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn
      });

      const newBook = await book.save();
      res.status(201).json(newBook);
    } else {
      res.status(409).json({ message: "Book with this ISBN already exists" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// delete book
router.delete("/delete/:isbn", async (req, res) => {
  const isbn = req.params.isbn;

  try {
    const deletedBook = await Book.findOneAndRemove({ isbn: isbn });

    if (!deletedBook) {      
      res.status(404).json({ message: "Book not found" });
    } else {      
      res.json({ message: "Book deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
