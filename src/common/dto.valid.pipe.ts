import { validateOrReject, ValidationError, ValidatorOptions, validate } from "class-validator";
import { IPipeTransform, Classtype } from "classrouter";
import { IInvalidProperties, ValidationFormException } from "@napp/exception";
import { plainToClass } from "class-transformer";

export class DtoValidatePipe implements IPipeTransform {
    constructor(public classty: Classtype, public options?: ValidatorOptions) {

    }
    async transform(value: any) {
        let ins = plainToClass(this.classty, value);

        let errors = await validate(ins);
        if (errors.length) {
            let msg: IInvalidProperties = {};
            for (let e of errors) {
                if (e && e.constraints) {
                    Object.keys(e.constraints).map((k) => {
                        if (Array.isArray(msg[e.property])) {
                            msg[e.property].push(e.constraints[k]);
                        } else {
                            msg[e.property] = [e.constraints[k]];
                        }
                    });
                }
            }
            throw new ValidationFormException("invalid properties", msg);
        }
        return ins;
    }
}
