import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

interface RequestSchemas {
    body?: ObjectSchema;
    params?: ObjectSchema;
    query?: ObjectSchema;
}

export const validateRequest =
    (schemas: RequestSchemas) =>
    (req: Request, res: Response, next: NextFunction) => {

        const errors: string[] = [];

        const validatePart = (
            schema: ObjectSchema,
            data: any,
            partName: string
        ) => {
            const { error, value } = schema.validate(data, {
                abortEarly: false,
                stripUnknown: true
            });

            if (error) {
                errors.push(
                    ...error.details.map(
                        detail => `${partName}: ${detail.message}`
                    )
                );
            }

            return value;
        };

        if (schemas.body) {
            req.body = validatePart(schemas.body, req.body, "Body");
        }

        if (schemas.params) {
            req.params = validatePart(schemas.params, req.params, "Params");
        }

        if (schemas.query) {
            req.query = validatePart(schemas.query, req.query, "Query");
        }

        if (errors.length > 0) {
            return res.status(400).json({
                error: `Validation error: ${errors.join(", ")}`
            });
        }

        next();
    };
