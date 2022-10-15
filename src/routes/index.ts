import { Router } from "express";
import { registrationRouter } from "../Task_registration/registration.routes";

export const allRoutes: Record<string, Router> = {
    'registration' : registrationRouter,
}