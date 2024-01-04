import express from "express";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";
import compression from "compression";
import rateLimit from "express-rate-limit";
dotenv.config();
import "./utils/dbConnect.js"
import publicRouter from "./controllers/public/index.js"
import notesRouter from "./controllers/notes/index.js"
import authMiddleware from "./middlewares/auth/index.js";

const PORT = process.env.PORT || 3000;

// Rate Limiter
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minute rate limit
    max: 1000, 
    delayMs: 0,
    message: 'Too many Requests, Try again later.',
    headers : true
  });

const app = express();
app.use(cors('*'));
app.use(logger('dev'));
app.use(express.json());
app.use(compression());
app.use(limiter)

app.get('/', (req, res) => {
    res.json(`Notes api is Up`);
})
app.use('/api/auth', publicRouter);

app.use(authMiddleware)
app.use('/api', notesRouter)

app.use((req, res, next) => {
    res.status(404).send("404 - Not Found");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("500 - Internal Server Error");
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})