import * as repository from "../repositories/firestoreRepository";
import * as service from "./eventService";

jest.mock("../repositories/firestoreRepository");

describe("Event Service", () => {
  it("should create an event", async () => {
    (repository.createDocument as jest.Mock).mockResolvedValue("123");

    const result = await service.createEvent({
      name: "Test",
      capacity: 50,
      date: "2026-01-01",
      category: "Conference",
    });

    expect(repository.createDocument).toHaveBeenCalled();
    expect(result.id).toBe("123");
  });
});