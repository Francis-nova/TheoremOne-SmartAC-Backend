import Route from '@ioc:Adonis/Core/Route';

// import routes
// import 'App/Controllers/Http/Devices/AuthenticationController';

Route.get('/', async () => {
    return { app: 'TheoremOne-Assessments', version: '1.0.1', author: 'Francis Awuya'};
});

/**
 * Device Routes...
 */
Route
    .group(() => {
        Route.post('/registration', 'Devices/AuthController.registration'); // registration a device...

        // report group...
        Route.group(() => {
            Route.post('/', 'Devices/ReportsController.reportSensorReadings'); // report
        }).prefix('/reports').middleware('deviceAuth');

    })
    .prefix('/device');
