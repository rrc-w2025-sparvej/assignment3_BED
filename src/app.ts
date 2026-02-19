import express from "express";
import eventRoutes from "./api/v1/routes/eventRoutes";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Register API routes
app.use("/api/v1/events", eventRoutes);


export default app;

