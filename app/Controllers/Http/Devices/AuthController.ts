import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import Device from 'App/Models/Device';

import Alert from 'App/Models/Alert';

import DateTime from 'luxon';

// import helper...
import { tokenGenerator } from './../../../../helpers/index';

export default class AuthenticationController {

    // registration method... 
    public async registration(ctx: HttpContextContract) {
        /** lets begin the registration process... */

        // validate data
        const newDeviceSchema = schema.create({
            serialNo: schema.string(),
            firmwareVersion: schema.string(),
        });

        /**
         * Validate request body against the schema
         */
        await ctx.request.validate({ schema: newDeviceSchema });

        // request body...
        const requestBody = ctx.request.body();

        // get a generated access token...
        const token = tokenGenerator();

        try {
            // check if device serial number exist...
            const deviceCheck = await Device.findBy('serial_number', requestBody.serialNo);

            if (deviceCheck) {

                // update the device token...
                deviceCheck.token = token;
                await deviceCheck.save(); // save

                return ctx.response.status(200).send({
                    status: true,
                    accessToken: token
                }, true);
            }

            // Register the device...
            await Device.create({
                'serial_number': requestBody.serialNo,
                'firmware_version': requestBody.firmwareVersion,
                'token': token // generated token... 
            });

            // check device if has alert error..
            await Alert.query().update({ 
                resolve_state: 'resolved', 
                resolved_alert_at: DateTime
            })
            .where({ serial_number: requestBody.serialNo, alert_sensor: 'formatError' });

            return ctx.response.status(201).send({
                status: true,
                accessToken: token
            }, true);

        } catch (error) {
            return ctx.response.status(500).send({
                status: false,
                accessToken: null,
                msg: 'A service error occurred, could not register this device.',
            }, true);
        }
    }

}
