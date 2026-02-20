import { Request, Response } from "express";
import * as eventService from "../services/eventService";

export const createEventHandler = (req: Request, res: Response) => {
const event = eventService.createEvent(req.body);

res.status(201).json({
message: "Event created successfully",
data: event,
});
};

export const getAllEventsHandler = (_: Request, res: Response) => {
const events = eventService.getAllEvents();
res.status(200).json(events);
};

export const getEventByIdHandler = (
  req: Request<{ id: string }>,
  res: Response
) => {
const event = eventService.getEventById(req.params.id);

if (!event) {
return res.status(404).json({ message: "Event not found" });
}

res.status(200).json(event);
};

export const updateEventHandler = (
  req: Request<{ id: string }>,
  res: Response
) => {
const updated = eventService.updateEvent(req.params.id, req.body);

if (!updated) {
return res.status(404).json({ message: "Event not found" });
}

res.status(200).json(updated);
};

export const deleteEventHandler = (
  req: Request<{ id: string }>,
  res: Response
) => {
const deleted = eventService.deleteEvent(req.params.id);

if (!deleted) {
return res.status(404).json({ message: "Event not found" });
}

res.status(204).send();
};
