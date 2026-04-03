import type { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validateData =
  (schema: z.ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.strict().parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const zodErrorMessage = z.flattenError(error);

        return res.status(404).send({
          error: 'Invalid data',
          details: zodErrorMessage.fieldErrors,
        });
      } else {
        res.status(500).send({
          error: 'Internal Server Error',
        });
      }
    }
  };
