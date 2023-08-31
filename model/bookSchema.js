const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            require: [true, "Please enter ID"],
            default: 0
        },
        title: {
            type: String,
            require: [true, "Please enter book title"],

        },
        author: {
            type: String,
            require: [true, "Please enter book author"],
        },
        description: {
            type: String,
            require: false
        }

    },
    {
        timeStamps: true,
    }
);

const Book = mongoose.model("Book", bookSchema)

module.exports = Book;
