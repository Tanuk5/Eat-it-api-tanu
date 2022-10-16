
import { BaseController } from "../base_controller";
import { IRegistration, Registration } from "./registration.schema";

class RegistrationController extends BaseController<IRegistration> {}

export const _registrationController = new RegistrationController(Registration)