import express from "express";
import { validateRequest } from "../middleware/validate";
import { eventSchemas } from "../validation/eventSchemas";
import {
  createEventHandler,
  getAllEventsHandler,
  getEventByIdHandler,
  updateEventHandler,
  deleteEventHandler,
} from "../controllers/eventController";

const router = express.Router();


router.post("/", validateRequest(eventSchemas.create), createEventHandler);
router.get("/", getAllEventsHandler);
router.get("/:id", getEventByIdHandler);

router.put("/:id", updateEventHandler);
router.delete("/:id", deleteEventHandler);

export default router;
