import { Router } from "express";

import { registrationRouter } from "./registration.routes";

export const allRoutes: Record<string, Router> = {
    'registration' : registrationRouter
}
