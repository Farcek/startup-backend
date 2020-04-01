import { plainToClass } from "class-transformer";
import { IPipeTransform, Classtype } from "classrouter";


export class DtoPipe implements IPipeTransform {

    constructor(public classty: Classtype) {

    }
    transform(value: any) {
        let ins = plainToClass(this.classty, value);
        return ins;
    }
}
