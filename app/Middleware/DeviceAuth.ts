import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Device from 'App/Models/Device';

export default class DeviceAuth {
    public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
        // get request bearer...
        const accessToken = request.headers()?.authorization;

        // split bearer form data...
        const splitToken = accessToken?.split(' ');

        const device = await Device.findBy('token', splitToken?.[1]);

        if (!device) {
            response.unauthorized({ error: 'unauthorized access' });
            return;
        }

        await next();
    }
}
