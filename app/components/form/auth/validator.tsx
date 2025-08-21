import { FenextjsValidator } from "fenextjs-validator";
import { IFormAuth } from "./interface";

export const FormAuthValidator = FenextjsValidator<IFormAuth>()
    .setName("FormAuth")
    .isObject({
        user: FenextjsValidator()
            .isString("Usuario requerido")
            .isRequired("Usuario requerido"),
        password: FenextjsValidator()
            .isString("Contraseña requerida")
            .isRequired("Contraseña requerida"),
    });
