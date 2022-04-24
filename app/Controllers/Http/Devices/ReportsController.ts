import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Device from 'App/Models/Device'

export default class ReportsController {

    public async reportSensorReadings (ctx: HttpContextContract) {
        return 'lorem';
    }

}
