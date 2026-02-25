import Joi from "joi";

export const eventSchemas = {
    create: {
        body: Joi.object({
            name: Joi.string()
                .min(5)
                .required(),

            date: Joi.date()
                .iso()
                .greater("now")
                .required(),


            capacity: Joi.number()
                .integer()
                .min(5)
                .required(),

            registrationCount: Joi.number()
                .integer()
                .min(0)
                .default(0)
                .when("capacity", {
                    is: Joi.number(),
                    then: Joi.number().max(Joi.ref("capacity"))
                }),

            status: Joi.string()
                .valid("active", "cancelled", "completed")
                .default("active"),

            category: Joi.string()
                .valid("conference", "workshop", "meetup", "seminar", "general")
                .default("general")
        })

    }

};

