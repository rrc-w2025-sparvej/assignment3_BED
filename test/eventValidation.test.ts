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

        // Defaults applied by Joi
        expect(value.registrationCount).toBe(0);
        expect(value.status).toBe("active");
        expect(value.category).toBe("general");
    });

    it("should reject event with name shorter than allowed", () => {
        // Arrange
        const invalidEvent = {
            name: "Hi",
            date: "2026-06-01T10:00:00Z",
            capacity: 50
        };

        // Act
        const { error } = eventSchemas.create.body.validate(invalidEvent);

        // Assert
        expect(error).toBeDefined();
        expect(error?.details[0].message).toMatch(/name/i);
    });

    it("should reject event with capacity below minimum", () => {
        // Arrange
        const invalidEvent = {
            name: "Valid Event Name",
            date: "2026-06-01T10:00:00Z",
            capacity: 2
        };

        // Act
        const { error } = eventSchemas.create.body.validate(invalidEvent);

        // Assert
        expect(error).toBeDefined();
        expect(error?.details[0].message).toMatch(/capacity/i);
    });

    it("should reject event with a past date", () => {
        // Arrange
        const invalidEvent = {
            name: "Past Event",
            date: "2020-01-01T10:00:00Z",
            capacity: 20
        };

        // Act
        const { error } = eventSchemas.create.body.validate(invalidEvent);

        // Assert
        expect(error).toBeDefined();
        expect(error?.details[0].message).toMatch(/date/i);
    });

});