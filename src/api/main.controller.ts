import { Get, Action, Controller, QueryParam, RequestParam } from "classrouter";



@Controller({
    name: 'main',
    path: '/console'
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