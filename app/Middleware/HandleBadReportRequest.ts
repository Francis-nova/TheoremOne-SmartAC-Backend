import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Alert from 'App/Models/Alert';
import Device from 'App/Models/Device';

import { toTimestamp } from './../../helpers/index';
import { DateTime } from 'luxon';
import moment from 'moment';

export default class HandleBadReportRequest {
    public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
        // let us handle bad report request...

        // request body...
        const requestData = request.body();

        // lets check for temperature request data...
        const temperatureData = Number(requestData.temp);
        if (isNaN(temperatureData)) {

            // add to alert...
            await Alert.create({
                serial_number: requestData.serialNo,
                alert_note: 'Temperature not in correct format',
                alert_sensor: 'formatError',
                alert_data_type: requestData.temp,
                reference: `${requestData.serialNo}-${toTimestamp(requestData.timestamp)}`,
                device_recorded_alert_at: requestData.timestamp,
            });
        }

        // lets check for humidity request data...
        const humidityData = Number(requestData.humidity);
        if (isNaN(humidityData)) {

            // add to alert...
            await Alert.create({
                serial_number: requestData.serialNo,
                alert_note: 'Humidity not in correct format',
                alert_sensor: 'formatError',
                alert_data_type: requestData.humidity,
                reference: `${requestData.serialNo}-${toTimestamp(requestData.timestamp)}`,
                device_recorded_alert_at: requestData.timestamp,
            });
        }

        // lets check for carbon monoxide request data...
        const carbonMonoxideData = Number(requestData.carbonMonoxide);
        if (isNaN(carbonMonoxideData)) {

            // add to alert...
            await Alert.create({
                serial_number: requestData.serialNo,
                alert_note: 'Carbon monoxide not in correct format',
                alert_sensor: 'formatError',
                alert_data_type: requestData.carbonMonoxide,
                reference: `${requestData.serialNo}-${toTimestamp(requestData.timestamp)}`,
                device_recorded_alert_at: requestData.timestamp,
            });
        }

        /*** handle bad request count... */

        // get device via serial number...
        const device = await Device.findBy('serial_number', requestData.serialNo);

        // format error count...
        const formatErrorCount = await Alert.query()
            .where('serial_number', requestData.serialNo)
            .where('alert_sensor', 'formatError')
            .where('updated_at', '>=', moment(device?.updated_at).format('yyyy-MM-DD'))
            .limit(500);

        if (formatErrorCount.length === 500) {
            // create new alert...
            await Alert.create({
                serial_number: requestData.serialNo,
                alert_note: 'Device sending unintelligible data',
                alert_sensor: 'formatError',
                alert_data_type: 'unintelligible data',
                reference: `${requestData.serialNo}-${toTimestamp(requestData.timestamp)}`,
                device_recorded_alert_at: DateTime.now(),
            });
        }

        await next();
    }
}
