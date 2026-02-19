import express from "express";
import { validateRequest } from "../middleware/validate";
import { eventSchemas } from "../validation/eventSchemas";
import { createEventHandler } from "../controllers/eventController";

const router = express.Router();


router.post("/", validateRequest(eventSchemas.create), createEventHandler);

export default router;
