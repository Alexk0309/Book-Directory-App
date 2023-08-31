const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Book = require("./model/bookSchema");

app.use(express.json());
app.use(cors());
const port = 3000;

app.post("/book", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/book", async (req, res) => {
  try {
    const book = await Book.find(
      {},
      {
        _id: false,
        id: true,
        title: true,
        author: true,
        description: true,
      }
    );
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/book/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findOneAndUpdate({ id }, req.body, { new: true });

    if (!book) {
      return res.status(404).json({ message: `Cannot find book id ${id}` });
    }

    const updatedBook = await Book.find(
      { id },
      {
        _id: false,
        title: true,
        author: true,
        description: true,
      }
    );
    res.status(200).json(updatedBook);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/book/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.deleteOne({
      id: id,
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect("mongodb://localhost:27017/book_directory")
  .then(() => {
    console.log("Connected to mongoDB");
    app.listen(port, () => {
      console.log(`App listening to port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
