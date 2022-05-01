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
            Route.post('/', 'Devices/ReportsController.reportSensorReadings')
                .middleware('handleBadReportRequest'); // report
        }).prefix('/reports').middleware(['deviceAuth']);

    })
    .prefix('/device');


// user routes...
Route.post('users/signin', 'Users/AuthController.signIn'); // user sign in...

/**
 * Users Routes
 */
Route.group(() => {
    
    Route.get('signout', 'Users/AuthController.signOut'); // user sign out...
    
    // devices endpoint...
    Route.get('devices', 'Users/DevicesController.getAllDevices');
    Route.get('device-sensor-readings', 'Users/DevicesController.sensorReadings');
    Route.get('device-sensor-readings-data', 'Users/DevicesController.sensorReadingsData');

    // alerts endpoints...
    Route.get('alerts', 'Users/AlertsController.alerts');
    Route.patch('mark-alerts', 'Users/AlertsController.markAlerts');


    Route.get('alert-report', 'Users/AlertsController.alertReports');


}).prefix('/users').middleware('auth:api');