import { Request, Response } from "express";
import * as eventService from "../services/eventService";

export const createEventHandler = async (req: Request, res: Response) => {
const event = await eventService.createEvent(req.body);

res.status(201).json({
message: "Event created successfully",
data: event,
});
};

export const getAllEventsHandler = async (_: Request, res: Response) => {
const events = await eventService.getAllEvents();
res.status(200).json(events);
};

export const getEventByIdHandler = async (
  req: Request<{ id: string }>,
  res: Response
) => {
const event = await eventService.getEventById(req.params.id);

if (!event) {
return res.status(404).json({ message: "Event not found" });
}

res.status(200).json(event);
};

export const updateEventHandler = async (
  req: Request<{ id: string }>,
  res: Response
) => {
const updated = await eventService.updateEvent(req.params.id, req.body);

if (!updated) {
return res.status(404).json({ message: "Event not found" });
}

res.status(200).json(updated);
};

export const deleteEventHandler = async (
  req: Request<{ id: string }>,
  res: Response
) => {
const deleted = await eventService.deleteEvent(req.params.id);

if (!deleted) {
return res.status(404).json({ message: "Event not found" });
}

res.status(204).send();
};
