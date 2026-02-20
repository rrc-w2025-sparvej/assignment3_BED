import { Event, CreateEventDTO } from "../models/Event";

const events: Event[] = [];

export const createEvent = (eventData: CreateEventDTO): Event => {
  const newEvent: Event = {
    ...eventData,
    id: Date.now().toString(),
    registrationCount: 0,
    status: "active",
  };

  events.push(newEvent);
  return newEvent;
};