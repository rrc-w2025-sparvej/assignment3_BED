import express from "express";


const app = express();

// Middleware to parse JSON bodies
app.use(express.json());


export default app;

