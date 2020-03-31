import { Get, Action, Controller, QueryParam, RequestParam } from "classrouter";
import { CustomerController } from "./customer/controller";



@Controller({
    name: 'main',
    path: '/console',
    controllers : [
        CustomerController
    ]
})
export class MainController {

    @Get({ path: '/', name: 'home' })
    async home() {
        return {
            page: 'home',
            at: new Date().toISOString()
        }
    }

    @Get({ path: '/about', name: 'about' })
    async about() {
        return {
            page: 'about',
            at: new Date().toISOString()
        }
    }
}