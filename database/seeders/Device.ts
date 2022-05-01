import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Device from 'App/Models/Device';
import { tokenGenerator } from './../../helpers/index';

export default class DeviceSeeder extends BaseSeeder {
    public async run() {    
        await Device.createMany([
            {
                serial_number: 'AC-4234-BU-THC3HWRYKM09SK',
                firmware_version: '1.2.0',
                token: tokenGenerator()
            },
            {
                serial_number: 'AC-4234-BU-THC3HWRYKM89SK',
                firmware_version: '1.2.2',
                token: tokenGenerator()
            },
            {
                serial_number: 'AC-4234-BU-THC3HWRYKM19SK',
                firmware_version: '2.1.2',
                token: tokenGenerator()
            }
        ]);
    }
}
