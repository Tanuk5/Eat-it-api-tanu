import { Request, Response, Router } from "express";
import { _registrationController } from "./registration.controller";

export const registrationRouter = Router();

registrationRouter
    .get('/', (_req: Request, res: Response) => _registrationController.find(res, {}))
    .get('/:id', (req: Request, res: Response) => _registrationController.findOne(res, {_id: req.params.id}))
    .post('/', (req: Request, res: Response) => _registrationController.create(res, req.body))
    .patch('/:id', (req: Request, res: Response) => _registrationController.update(res, req.params.id, req.body))
    .delete('/:id', (req: Request, res: Response) => _registrationController.delete(res, req.params.id))
 