// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Device from 'App/Models/Device';
import Report from 'App/Models/Report';
import moment from 'moment';
import { schema } from '@ioc:Adonis/Core/Validator';

export default class DevicesController {

    public async getAllDevices ({request}) {

        const validator = schema.create({
            limit: schema.number.optional(),
            page: schema.number.optional(),
            serialNo: schema.string.optional(),

            startDate: schema.date.optional({
                format: 'yyyy-MM-dd',
            }),
            endDate: schema.date.optional({
                format: 'yyyy-MM-dd',
            }),
        });

        /**
         * Validate request body against the schema
         */
        await request.validate({ schema: validator });

        const page = request.input('page', 1);
        const limit = request.input('limit', 10);
        const serialNo = request.input('serialNo');

        // date parameter...
        const startDate = request.input('dateStart') ? moment(request.input('dateStart')).format('yyyy-MM-DD') : '';
        const endDate = request.input('dateEnd')? moment(request.input('dateEnd')).format('yyyy-MM-DD') : '';

        const devices = await Device
            .query()
            .where('serial_number', '!=', serialNo)
            .orWhere('updated_at', '>=', startDate)
            .andWhere('updated_at', '<=', endDate)
            .orderBy('updated_at', 'desc')
            .debug(true)
            .paginate(page, limit);

        return devices.toJSON();
    }   

    public async sensorReadings({request, response}) {

        // validate data
        const validator = schema.create({
            startDate: schema.date.optional({
                format: 'yyyy-MM-dd',
            }),
            endDate: schema.date.optional({
                format: 'yyyy-MM-dd',
            }),
            serialNo: schema.string(),
            limit: schema.number.optional(),
            page: schema.number.optional(),
        });

        /**
         * Validate request body against the schema
         */
        await request.validate({ schema: validator });

        const serialNo = request.input('serialNo');

        // pagination parameters...
        const page = request.input('page', 1);
        const limit = request.input('limit', 10);
        const startDate = request.input('dateStart') ? moment(request.input('dateStart')).format('yyyy-MM-DD') : '';
        const endDate = request.input('dateEnd')? moment(request.input('dateEnd')).format('yyyy-MM-DD') : '';

        if(!serialNo) {
            return response.status(400).send({
                status: false,
                msg: 'Please  device serial number',
            }, true);
        }

        // get device info
        const device = await Device.findBy('serial_number', serialNo);

        if(!device) {
            return response.status(404).send({
                status: false,
                msg: `Device with serial number ${serialNo}, was not found!`,
            }, true);
        }

        // get all sensor readings...
        const sensorReadings = await Report
            .query()
            .where('updated_at', '>=', startDate)
            .andWhere('updated_at', '<=', endDate)
            .orderBy('updated_at', 'desc')
            .debug(true)
            .paginate(page, limit);        
    
        return sensorReadings;
    }

    public async sensorReadingsData() {
        // get alert types

        // const temperature = [];
        // const humidity, 
        // const carbononoxide

    }


}
