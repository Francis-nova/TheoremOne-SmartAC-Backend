import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Users from 'App/Models/Users';

export default class UserSeeder extends BaseSeeder {
    public async run () {
        await Users.createMany([
            {
                username: 'user1',
                password: '123456'
            },
            {
                username: 'user2',
                password: '123456'
            }
        ]);
    }
}
