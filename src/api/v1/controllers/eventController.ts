import { Request, Response, NextFunction } from "express";

export const createEventHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        res.status(201).json({
            message: "Event created successfully",
            data: req.body
        });
    } catch (error) {
        next(error);
    }
};
