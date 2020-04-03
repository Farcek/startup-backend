import { confSys } from "../config";

const shortid = require('shortid');
// shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
if (0 <= confSys.APP_INSTANCE && confSys.APP_INSTANCE <= 16) {
    shortid.worker(confSys.APP_INSTANCE);
} else {
    throw new Error('shortid of worker id. Should be an integer between 0 and 16');
}


export function uuid(): string {
    return shortid.generate();
}
