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

export const getAllEvents = (): Event[] => events;

export const getEventById = (id: string): Event | undefined =>
  events.find(e => e.id === id);

export const updateEvent = (id: string, update: Partial<Event>): Event | null => {
  const event = events.find(e => e.id === id);
  if (!event) return null;

  Object.assign(event, update);
  return event;
};

export const deleteEvent = (id: string): boolean => {
  const index = events.findIndex(e => e.id === id);
  if (index === -1) return false;

  events.splice(index, 1);
  return true;
};