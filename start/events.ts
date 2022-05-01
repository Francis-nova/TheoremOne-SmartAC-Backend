/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Event from '@ioc:Adonis/Core/Event';
import Alert from 'App/Models/Alert';
import Database from '@ioc:Adonis/Lucid/Database';

import { toTimestamp } from './../helpers/index';

Event.on('new:report', async (data) => {


    console.log(data?.sensorId);

    // first check health status...
    if (data?.healthStatus !== 'OK') {
        try {
            const alertNote = 'Device is reporting health problem';
            const searchPayload = { serial_number: data.serialNo, alert_note: alertNote, resolve_state: 'new', alert_state: 'new', alert_sensor: 'health' };
            const persistancePayload = {
                serial_number: data.serialNo,
                alert_note: alertNote,
                reference: `${data.serialNo}-${toTimestamp(data.timestamp)}`,
                device_recorded_alert_at: data.timestamp,
                alert_sensor: 'health',
                alert_data_type: data.healthStatus,
                sensor_id: data.sensorId
            };
            await Alert.updateOrCreate(searchPayload, persistancePayload);

        } catch (error) {
            // TOdo handle exception
        }
    }

    // self resolve... for OK status...
    if (data?.healthStatus === 'OK')
        await Alert.query().update({
            resolve_state: 'resolved',
            resolved_alert_at: data.timestamp
        })
            .where({ serial_number: data.serialNo, alert_sensor: 'health' });

    // Carbon Monoxide at dangerous levels
    if (data?.carbonMonoxide > 9.00) {
        try {
            const alertNote = 'CO value has exceeded danger limit';
            const searchPayload = { serial_number: data.serialNo, alert_note: alertNote, resolve_state: 'new', alert_state: 'new', alert_sensor: 'carbon monoxide' };
            const persistancePayload = {
                serial_number: data.serialNo,
                alert_note: alertNote,
                reference: `${data.serialNo}-${toTimestamp(data.timestamp)}`,
                device_recorded_alert_at: data.timestamp,
                alert_sensor: 'carbon monoxide',
                alert_data_type: data?.carbonMonoxide,
                sensor_id: data.sensorId
            };
            await Alert.updateOrCreate(searchPayload, persistancePayload);
        } catch (error) {
            // TOdo handle exception
        }
    }

    // self resolve... for carbonMonoxide at dangerous levels...
    if (data?.carbonMonoxide <= 9.00)
        await Alert.query().update({
            resolve_state: 'resolved',
            resolved_alert_at: data.timestamp
        })
            .where({ serial_number: data.serialNo, alert_sensor: 'carbon monoxide' });

    // check temperature...
    if (data?.temp > 100.00 || data?.temp < -30.00) {
        try {
            const alertNote = 'Sensor temperature has value out of range';
            const searchPayload = { serial_number: data.serialNo, alert_note: alertNote, resolve_state: 'new', alert_state: 'new', alert_sensor: 'temperature' };
            const persistancePayload = {
                serial_number: data.serialNo,
                alert_note: alertNote,
                reference: `${data.serialNo}-${toTimestamp(data.timestamp)}`,
                device_recorded_alert_at: data.timestamp,
                sensor_id: data.sensorId
            };
            await Alert.updateOrCreate(searchPayload, persistancePayload);
        } catch (error) {
            // TOdo handle exception
        }
    }

    // self resolve... for temperature at dangerous levels...
    if (data?.temp <= 100.00 || data?.temp >= -30.00)
        await Alert.query().update({
            resolve_state: 'resolved',
            resolved_alert_at: data.timestamp
        })
            .where({ serial_number: data.serialNo, alert_sensor: 'temperature' });

    // check humidity 
    if (data?.humidity > 100.00 || data?.humidity < 0.00) {
        try {
            const alertNote = 'Sensor humidity has value out of range';
            const searchPayload = { serial_number: data.serialNo, alert_note: alertNote, resolve_state: 'new', alert_state: 'new', alert_sensor: 'humidity' };
            const persistancePayload = {
                serial_number: data.serialNo,
                alert_note: alertNote,
                reference: `${data.serialNo}-${toTimestamp(data.timestamp)}`,
                device_recorded_alert_at: data.timestamp,
                sensor_id: data.sensorId
            };
            await Alert.updateOrCreate(searchPayload, persistancePayload);
        } catch (error) {
            // TOdo handle exception
        }
    }

    // self resolve... for humidity at dangerous levels...
    if (data?.temp <= 100.00 || data?.temp <= 0.00)
        await Alert.query().update({
            resolve_state: 'resolved',
            resolved_alert_at: data.timestamp
        })
            .where({ serial_number: data.serialNo, alert_sensor: 'humidity' });

});


Event.on('db:query', Database.prettyPrint);