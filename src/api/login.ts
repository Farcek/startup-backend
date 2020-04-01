import { Get, Action, Controller, QueryParam, RequestParam, Post, BodyParam } from "classrouter";

import { dtoLogin } from "console-dto/login";
import { jsonBodyParser } from "src/common/parser";
import { DtoValidatePipe } from "src/common/dto.valid.pipe";
import { DtoPipe } from "src/common/dto.pipe";
import { IsNotEmpty } from "class-validator";


class PayloadReq implements dtoLogin.IReq {

    @IsNotEmpty()
    username!: string;

    @IsNotEmpty()
    password!: string;

}

@Controller({
    name: 'login',
    path: '/login',
})
export class LoginController {

    @Post({ path: '/do', name: 'doLogin', befores: [jsonBodyParser] })
    async doLogin(
        @BodyParam(new DtoValidatePipe(PayloadReq)) payload: PayloadReq
    ) {
        return {
            page: 'home',
            at: new Date().toISOString()
        }
    }
}