import { Get, Action, Controller, QueryParam, RequestParam, Post, BodyParam } from "classrouter";

import { dtoLoginByToken, dtoLoginBySid } from "console-dto/login";
import { jsonBodyParser } from "src/common/parser";
import { DtoValidatePipe } from "src/common/dto.valid.pipe";
import { DtoPipe } from "src/common/dto.pipe";
import { IsNotEmpty } from "class-validator";
import { userly } from "src/userly";
import { DBSession } from "src/model/m.session";
import { uuid } from "src/common/uuid";


// tslint:disable-next-line: no-namespace
namespace dto {
    export class LoginTokenReq implements dtoLoginByToken.IReq {
        @IsNotEmpty()
        appusertoken!: string;
    }

    export class LoginTokenRes implements dtoLoginByToken.IRes {
        username: string = '';
        sid: string = '';
    }
    export class LoginSidReq implements dtoLoginBySid.IReq {

        @IsNotEmpty()
        sid: string = '';
    }
    export class LoginSidRes implements dtoLoginBySid.IRes {
        username: string = '';
    }
}

@Controller({
    name: 'login',
    path: '/login',
})
export class LoginController {

    @Post({ path: '/token', name: 'token', befores: [jsonBodyParser] })
    async loginToken(
        @BodyParam(new DtoValidatePipe(dto.LoginTokenReq)) { appusertoken }: dto.LoginTokenReq
    ): Promise<dto.LoginTokenRes> {

        // console.log('userlytoken',userlytoken)

        let user = await userly.loginByTokencode(appusertoken);
        let sess = await DBSession.query().insert({
            id: uuid(),
            userly: user.userid,
            userly_token: user.usertoken,
            created_at: new Date(),
            expired_at: new Date(Date.now() + user.tokenexp)

        });

        return {
            username: user.name,
            sid: sess.id || ''
        }
    }

    @Post({ path: '/sid', name: 'sid', befores: [jsonBodyParser] })
    async loginSid(
        @BodyParam(new DtoValidatePipe(dto.LoginSidReq)) { sid }: dto.LoginSidReq
    ): Promise<dto.LoginSidRes> {

        let sess = await DBSession.query().findById(sid);
        if (sess) {
            let user1 = await userly.userProfileByAppuserid1(sess.userly);
            console.log('user', user1)
            return {
                username: 'aaa'
            }
        }

        throw new Error('session not found');

    }
}