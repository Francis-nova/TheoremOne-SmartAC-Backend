import { test } from '@japa/runner';

// base URL
test('Base Endpoint!', async ({ client }) => {
    const response = await client.get('/');

    response.assertStatus(200);
});

// Devices Endpoint test...
test.group('Devices endpoint test', () => {

    const token = '4NmkdxsLAX1toA18upm5drNBCOYQAH6tkydpnMWHm-cFYrppcNWKIcn-sGmRFqB9lCEFyahjdze5jMLx1_l1qHH2EE5MlFZCLa4iwmb_W-A5ghiplHacbryfiJ_Nol13DbCINGhzddALc5YMGcNRm-_kD9YOEob66qE3stvfQJRtaSxOgYBqW-r57QZjDnCbRRRiVkQtodZgOTr0TYXDo6cv0MKRqb0AqfFSz0AVY87-GKn_hxfEfiD25g';

    // Register new device...
    test('Register a new device', async ({ client }) => {
        const response = await client.post('/device/registration').form({
            serialNo: 'AC-4234-BU-BUHC3HWRY89M09Kp',
            firmwareVersion: '1.0.1'
        });

        response.assertStatus(201);
    });

    // update the device token (re-register)
    test('Register a new device (update)', async ({ client }) => {
        const response = await client.post('/device/registration').form({
            serialNo: 'AC-4234-BU-BUHC3HWRY89M09Kp',
            firmwareVersion: '1.0.1'
        });

        response.assertStatus(201);
    });

    // Bad request...
    test('Register a new device (bad request)', async ({ client }) => {
        const response = await client.post('/device/registration').form({
            // serialNo: "AC-4234-BU-BUHC3HWRY89M09Kp",
            // firmwareVersion: "1.0.1"
        });
        response.assertStatus(422);
    });

    // Register a new device (bad request)
    test('Register a new device (bad request)', async ({ client }) => {
        const response = await client.post('/device/registration').form({
            // serialNo: "AC-4234-BU-BUHC3HWRY89M09Kp",
            // firmwareVersion: "1.0.1"
        });
        response.assertStatus(422);
    });

    /** Reports (sensor data) */
    test('Report Entry...', async ({ client }) => {
        const response = await client.post('/device/reports').form({
            temp: 16.54,
            humidity: 15.00,
            carbonMonoxide: 9.50,
            healthStatus: 'needs_filter',
            serialNo: 'AC-4234-BU-BUHC3HWRY89M09Kp',
            timestamp: '2022-04-24 17:57:14'
        }).bearerToken(token);
        response.assertStatus(201);
    });

    test('Report Bad request...', async ({ client }) => {
        const response = await client.post('/device/reports').form({
            'serialNo': 'AC-4234-BU-BUHC3HWRY89M09Kp',
            'timestamp': '2022-04-24 17:57:14'
        }).bearerToken(token);
        response.assertStatus(422);
    });
});

// Users Endpoint test...
test.group('Users endpoint test', () => {

    const userToken = 'MTg.2sON1mNGaFKbxJruJG88Vmi8IyTJlZ30b3vufzLuxHFpUbxkRNv4sXGoRg2J';
    const serialNo = 'AC-4234-BU-THC3HWRYKM09SK';

    // Sign in...
    test('User signin', async ({ client }) => {
        const response = await client.post('/users/signin').form({
            username: 'user1',
            password: '123456'
        });

        response.assertStatus(200);
    });

    // see all registered devices...
    test('get all registered devices', async ({ client }) => {
        const response = await client.get('/users/devices').bearerToken(userToken);
        response.assertStatus(200);
    });

    // see all sensor report...
    test('get all sensor report', async ({ client }) => {
        const response = await client.get(`/users/device-sensor-readings?serialNo=${serialNo}`).bearerToken(userToken);
        response.assertStatus(200);
    });

});


test.group('User Alerts endpoint test', () => {

    const userToken = 'MTg.2sON1mNGaFKbxJruJG88Vmi8IyTJlZ30b3vufzLuxHFpUbxkRNv4sXGoRg2J';

    // all alert endpoints...
    test('Alerts endpoint...', async ({ client }) => {
        const response = await client.get('/users/alerts?resolveStatus=all&status=all')
            .bearerToken(userToken);
        response.assertStatus(200);
    });

    // mark alerts
    test('mark alerts', async ({client}) => {
        const response = await client.patch('/users/mark-alerts')
            .form({
                alerts: [1],
                status: 'viewed'
            })
            .bearerToken(userToken);
        response.assertStatus(200);
    });

    // alert report...
    test('alert reports', async ({client}) => {
        const response = await client.get('/users/alert-report?alertId=20')
            .bearerToken(userToken);
        response.assertStatus(200);
    });
});