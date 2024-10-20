import { NextFunction, Request, Response } from "express";
import { REPLCommand } from "repl";

export const errorNotFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: 'error',
        message: 'Not Found',
    });
};


export const errorServerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack); 
    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
};