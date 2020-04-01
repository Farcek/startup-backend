import { validate } from "class-validator";
import { IPipeTransform } from "classrouter";
import { IInvalidProperties, ValidationFormException } from "@napp/exception";

export class ValidatePipe implements IPipeTransform {

    async transform(value: any) {
        let errors = await validate(value);

        if (errors.length > 0) {

            let msg: IInvalidProperties = {};
            errors.map((e) => {
                if (e && e.constraints) {
                    Object.keys(e.constraints).map((k) => {
                        if (Array.isArray(msg[e.property])) {
                            msg[e.property].push(e.constraints[k]);
                        } else {
                            msg[e.property] = [e.constraints[k]];
                        }
                    });
                }
            });
            throw new ValidationFormException("validation error", msg);
        } else {
            return value;
        }
    }
}
