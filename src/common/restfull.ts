import fetch, { Response, Request } from 'cross-fetch';
import { ExceptionConvert } from '@napp/exception';

export namespace RestFull {
    export interface IOptions {
        headers: Record<string, string>
    }
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
    async function _fetch(res: Response) {
        if (res.ok && res.json) {
            return res.json();
        }

        if(res.json) {
            let err =await res.json();
            console.log('err',err)
            throw ExceptionConvert(err);
        }

        console.log(await res.text())

        throw Error(res.statusText);
    }

    export async function get<T>(url: string, options?: IOptions): Promise<T> {
        let raw = await fetch((url), {
            method: 'GET',
            headers: {
                ...headers,
                ...(options?.headers)
            }
        })
            ;

        return await _fetch(raw)
    }
    export async function post<T>(url: string, data: Record<string, any>, options?: IOptions): Promise<T> {
        let raw = await fetch((url), {
            method: 'POST',
            headers: {
                ...headers,
                ...(options?.headers)
            },
            body: JSON.stringify(data || {})
        });

        return await _fetch(raw)
    }
}
