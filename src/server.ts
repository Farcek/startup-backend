import "reflect-metadata";
import confEnv from "./config";
import { ClassrouterFactory, JsonResponseFilter } from 'classrouter'
import { ExceptionConvert } from "@napp/exception";
import { MainController } from "./api/main.controller";
import loggerDefault from "./logger";
import { dbInit } from "./model";

const express = require('express');
const morgan = require('morgan');


async function startup() {
    const app = express();

    try {
        await dbInit();
    } catch (error) {
        loggerDefault.error('db connectio error', ExceptionConvert(error).toObject());
        throw error;
    }

    if (confEnv.LOG_ACCESS) {
        app.use(morgan(confEnv.LOG_ACCESS_FORMAT));
    }

    app.use(express.static('dist.console.frontend'));


    const factory = new ClassrouterFactory({
        basePath: '/api',
        logger: (l: string, m: string, d: any) => loggerDefault.log(l, m, d),
        routerBuilder: () => express.Router(),
        errorParser: (err: any) => ExceptionConvert(err),
        controllers: [MainController],
        responseFilters: {
            default: new JsonResponseFilter(),
            filters: [

            ] // your custom response filters
        },
    });

    factory.build(app);



    app.listen(confEnv.SERVER_PORT, confEnv.SERVER_HOST, () => {
        const serverType = confEnv.isProduction ? 'production' : 'development'
        loggerDefault.info(`Server (${serverType}) running port="${confEnv.SERVER_PORT}", host="${confEnv.SERVER_HOST}"`, {
            port: confEnv.SERVER_PORT,
            host: confEnv.SERVER_HOST,
            app_instance: confEnv.NODE_APP_INSTANCE
        })
    });
}


// tslint:disable-next-line: no-console
startup().catch(console.log);
