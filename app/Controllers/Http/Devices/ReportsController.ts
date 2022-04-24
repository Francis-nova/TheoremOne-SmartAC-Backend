import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Report from 'App/Models/Report'
import Alert from 'App/Models/Alert'

import {toTimestamp} from './../../../../helpers/index';

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

        // get request body...
        const requestBody = ctx.request.body();

        try {
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

                /*** check for alerts... */
                this.alertChecker(requestBody);

                return ctx.response.status(201).send({
                    status: true,
                    msg: 'Report collected successfully',
                }, true);
            }

        } catch (error) {
            // TO do process failed request...
            return ctx.response.status(400).send({
                status: true,
                msg: 'Failed to collect report data...',
                error: error
            }, true);
        }
    }

    // Alert checker...
    public async alertChecker(data: any) {
        // first check health status...
        if (data?.healthStatus !== 'OK') {

            try {
                await Alert.create({
                    'serial_number': data.serialNo,
                    'alert_note': `Device is reporting health problem - ${data.healthStatus}`,
                    'reference': `${data.serialNo}-${toTimestamp(data.timestamp)}`,
                    'device_recorded_alert_at': data.timestamp,
                });
            } catch (error) {
                // TOdo handle exception
            }
        }

        // Carbon Monoxide at dangerous levels
        if (data?.carbonMonoxide > 9.00) {
            try {
                await Alert.create({
                    'serial_number': data.serialNo,
                    'alert_note': `CO value has exceeded danger limit`,
                    'reference': `${data.serialNo}-${toTimestamp(data.timestamp)}`,
                    'device_recorded_alert_at': data.timestamp,
                });
            } catch (error) {
                // TOdo handle exception
            }
        }

        // check temperature...
        if (data?.temp > 100.00 || data?.temp < -30.00) {
            try {
                await Alert.create({
                    'serial_number': data.serialNo,
                    'alert_note': `Sensor temperature has value out of range - ${data?.temp}`,
                    'reference': `${data.serialNo}-${toTimestamp(data.timestamp)}`,
                    'device_recorded_alert_at': data.timestamp,
                });
            } catch (error) {
                // TOdo handle exception
            }
        }

        // check humidity 
        if (data?.humidity > 100.00 || data?.humidity < 0.00) {
            try {
                await Alert.create({
                    'serial_number': data.serialNo,
                    'alert_note': `Sensor humidity has value out of range - ${data?.humidity}`,
                    'reference': `${data.serialNo}-${toTimestamp(data.timestamp)}`,
                    'device_recorded_alert_at': data.timestamp,
                });
            } catch (error) {
                // TOdo handle exception
            }
        }

        if (data?.carbonMonoxide > 1000.00 || data?.carbonMonoxide < 0.00) {
            try {
                await Alert.create({
                    'serial_number': data.serialNo,
                    'alert_note': `Sensor carbon monoxide has value out of range - ${data?.carbonMonoxide}`,
                    'reference': `${data.serialNo}-${toTimestamp(data.timestamp)}`,
                    'device_recorded_alert_at': data.timestamp,
                });
            } catch (error) {
                // TOdo handle exception
            }
        }
    }

}
