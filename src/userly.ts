import { confUserly } from "./config";
import { RestFull } from "./common/restfull";

const jwt = require('jsonwebtoken');
export namespace userly {
    export interface ILoginResult {
        userid: string
        name: string
        confirmed: boolean
        roles: string[],
        usertoken: string;
        lastlogin_at: Date;
        tokenexp: number;
    }

    function token() {
        let key = confUserly.USERLY_KEY_PRI;
        let payload = {
            a: confUserly.USERLY_KEY_APP
        }
        console.log('payload',payload)
        console.log('payload', key.toString())
        return jwt.sign(payload, key.toString(), { jwtid: 'client', expiresIn: '30s', algorithm: 'RS256' });
    }

    export async function loginByTokencode(appusertoken: string) {
        let headers = {
            // Authorization: 'Bearer ' + token()
        };
        return await RestFull.post<ILoginResult>(`${confUserly.USERLY_KEY_URL}/v4/auth/appuser`, { appusertoken }, { headers });
    }

    export async function userProfileByAppuserid1(appuserid: string) {
        let headers = {
            Authorization: 'Bearer ' + token()
        }

        console.log('headers',headers);
        let resp  = await RestFull.get<ILoginResult>(`${confUserly.USERLY_KEY_URL}/v4/app/profile/${appuserid}/info`, { headers });
        console.log('respppppp', resp)
        return resp;
    }

}