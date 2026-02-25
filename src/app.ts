import express from "express";
import eventRoutes from "./api/v1/routes/eventRoutes";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// health check 
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running"
  });
});

// Register API routes
app.use("/api/v1/events", eventRoutes);


export default app;

