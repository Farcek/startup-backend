import { Get, Action, Controller, QueryParam, RequestParam } from "classrouter";




@Controller({
    name: 'login',
    path: '/login',
})
export class MainController {

    @Get({ path: '/do', name: 'home' })
    async doLogin() {
        return {
            page: 'home',
            at: new Date().toISOString()
        }
    }
}