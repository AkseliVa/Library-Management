import express, {Request, Response} from "express";
import mongoose from "mongoose";
import cors from "cors";

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

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})