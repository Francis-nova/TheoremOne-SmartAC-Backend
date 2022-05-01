import { schema } from '@ioc:Adonis/Core/Validator';

export default class AuthController {

    public async signIn({ auth, request, response }) {

        // validate data
        const validator = schema.create({
            username: schema.string(),
            password: schema.string(),
        });

        /**
         * Validate request body against the schema
         */
        await request.validate({ schema: validator });

        const username = request.input('username');
        const password = request.input('password');

        try {
            const token = await auth.use('api').attempt(username, password, {
                expiresIn: '7days'
            });
            return token;
        } catch {
            return response.badRequest('Invalid credentials');
        }
    }

    public async signOut({ auth }) {
        await auth.use('api').revoke();
        return {
            revoked: true
        };
    }

}
