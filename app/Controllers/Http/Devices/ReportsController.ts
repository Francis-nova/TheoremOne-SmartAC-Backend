import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import Report from 'App/Models/Report';

import Event from '@ioc:Adonis/Core/Event';

export default class ReportsController {

    public async reportSensorReadings(ctx: HttpContextContract) {

        // validate data
        const newDeviceReportSchema = schema.create({
            serialNo: schema.string(),
            healthStatus: schema.string(),
            temp: schema.number(),
            humidity: schema.number(),
            carbonMonoxide: schema.number(),
            timestamp: schema.string(),
        });

        /**
         * Validate request body against the schema
         */
        await ctx.request.validate({ schema: newDeviceReportSchema });

        try {

            const requestBody = ctx.request.body();

            // save report data...
            const reportData = await Report.create({
                'serial_number': requestBody.serialNo,
                'humidity': requestBody.humidity,
                'temperature': requestBody.temp,
                'carbon_monoxide': requestBody.carbonMonoxide,
                'health_status': requestBody.healthStatus,
                'device_recorded_at': requestBody.timestamp,
            });

            // check if successful...
            if (reportData) {

                // report Data Id
                const reportDataId = reportData.id;

                requestBody['sensorId'] = reportDataId; // add reportDataId to data object... 

                /*** check for alerts... */
                Event.emit('new:report', requestBody);

                return ctx.response.status(201).send({
                    status: true,
                    msg: 'Report collected successfully',
                }, true);
            }
        } catch (error) {
            ctx.response.badRequest(error.messages);
        }
    }
}
