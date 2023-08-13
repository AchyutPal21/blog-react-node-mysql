import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";
import usersRouter from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.CORS_ORIGIN],
    credentials: true
}));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({storage});

app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    return res.status(200).json(file.filename);
})

// Posts Routes
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);











const PORT = process.env.PORT;
app.listen(PORT, (err) => {
    if (err) {
        console.log(`Error while listening on server ${PORT}`);
    } else {
        console.log(`Listening at port: ${PORT}`);
    }
});