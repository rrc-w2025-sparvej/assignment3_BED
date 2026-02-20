import {
    QuerySnapshot,
    DocumentSnapshot,
} from "firebase-admin/firestore";

import { Event, CreateEventDTO } from "../models/Event";

import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

// Firestore collection name
const COLLECTION = "events";

// crreate event
export const createEvent = async (eventData: CreateEventDTO): Promise<Event> => {
    try {
        const newEvent: Partial<Event> = {
            ...eventData,
            registrationCount: 0,
            status: "active",
        };

        const id: string = await createDocument<Event>(COLLECTION, newEvent);

        return { id, ...newEvent } as Event;
    } catch (error) {
        throw error;
    }
};

// Get All Events
 
export const getAllEvents = async (): Promise<Event[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);

        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Event, "id">),
        }));
    } catch (error) {
        throw error;
    }
};

// Get Event By ID
 
export const getEventById = async (id: string): Promise<Event | null> => {
    try {
        const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

        if (!doc) return null;

        return {
            id: doc.id,
            ...(doc.data() as Omit<Event, "id">),
        };
    } catch (error) {
        throw error;
    }
};

// Update Event
 
export const updateEvent = async (
    id: string,
    update: Partial<CreateEventDTO>
): Promise<Event | null> => {
    try {
        const existing = await getEventById(id);
        if (!existing) return null;

        const updated: Event = { ...existing, ...update };

        // Remove id before saving to Firestore
        const { id: _, ...dataToUpdate } = updated;

        await updateDocument<Event>(COLLECTION, id, dataToUpdate);

        return updated;
    } catch (error) {
        throw error;
    }
};

// Delete Event
export const deleteEvent = async (id: string): Promise<boolean> => {
    try {
        const existing = await getEventById(id);
        if (!existing) return false;

        await deleteDocument(COLLECTION, id);
        return true;
    } catch (error) {
        throw error;
    }
};