import express, {Request, Response} from "express";
import mongoose from "mongoose";
import cors from "cors";
import { ObjectId } from "mongodb";

interface CorsOptions {
    origin?: string;
    methods?: string[];
    allowHeaders?: string[];
  }

const app = express();
const port = 5000;

const uri = "mongodb+srv://vartiainenakseli736:l3OxdYSoGRqwyG78@cluster0.zc3nofq.mongodb.net/"

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173" as string,
  } as CorsOptions));

mongoose.connect(uri || "", {
}).then(() => {
    console.log("Connected to MongoDB")
}).catch(err => {
    console.log("Failed to connect to MongoDB", err)
})

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true }
});

const Book = mongoose.model("Book", bookSchema);

app.post("/books", async (req: Request, res: Response) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(500).json({ error: "Failed to add book" })
    }
});

app.get("/books", async (req: Request, res: Response) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch books" })
    }
})

app.delete("/book/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await Book.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({error: "Book not found"})
        }
        res.status(200).json({ message: "Book deleted succesully" })
    } catch (error) {
        res.status(500).json({ error: "Failed to delete book" })
    }
})

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});