import { eventSchemas } from "../src/api/v1/validation/eventSchemas";

describe("Event Validation Schema", () => {

    it("should accept a valid event", () => {
        // Arrange
        const validEvent = {
            name: "Tech Conference",
            date: "2026-06-01T10:00:00Z",
            capacity: 50
        };

        // Act
        const { error, value } = eventSchemas.create.body.validate(validEvent);

        // Assert
        expect(error).toBeUndefined();
        expect(value.registrationCount).toBe(0); // default applied
        expect(value.status).toBe("active");
        expect(value.category).toBe("general");
    });

    it("should reject event with short name", () => {
        const invalidEvent = {
            name: "Hi",
            date: "2026-06-01T10:00:00Z",
            capacity: 50
        };

        const { error } = eventSchemas.create.body.validate(invalidEvent);

        expect(error).toBeDefined();
    });

    it("should reject event with capacity below minimum", () => {
        const invalidEvent = {
            name: "Valid Name",
            date: "2026-06-01T10:00:00Z",
            capacity: 2
        };

        const { error } = eventSchemas.create.body.validate(invalidEvent);

        expect(error).toBeDefined();
    });

    it("should reject past dates", () => {
        const invalidEvent = {
            name: "Past Event",
            date: "2020-01-01T10:00:00Z",
            capacity: 20
        };

        const { error } = eventSchemas.create.body.validate(invalidEvent);

        expect(error).toBeDefined();
    });

});
