import { Get, Action, Controller, QueryParam, RequestParam } from "classrouter";



@Controller({
    name: 'customer',
    path: '/customer'
})
export class CustomerController {

    @Get({ path: '/list', name: 'home' })
    async list() {
        return [
            {id:1, name: 'time.mn', desc: 'time.mn news portal site'},
            {id:2, name: 'news.mn', desc: 'news.mn news portal site'}
        ]
    }
}