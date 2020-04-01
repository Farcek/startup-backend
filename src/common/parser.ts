const bodyParser = require("body-parser");

export function urlencodedBodyParser() {
    return bodyParser.urlencoded({ extended: false });
}

export function jsonBodyParser() {
    return bodyParser.json();
}
