import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Alerts extends BaseSchema {
    protected tableName = 'alerts';

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');

            table.string('serial_number', 50);

            // the resolve state of the alert
            table.enu('resolve_state', ['new', 'resolved', 'ignored'], {
                useNative: true,
                existingType: false,
                enumName: 'resolve_state',
            }).defaultTo('new');

            // the view state of an alert (new vs. viewed)
            table.enu('alert_state', ['new', 'viewed'], {
                useNative: true,
                existingType: false,
                enumName: 'alert_state',
            }).defaultTo('new');

            // alert note
            table.text('alert_note', 'longtext');

            // sensor
            table.enu('alert_sensor', ['temperature', 'humidity', 'carbon monoxide', 'health', 'formatError']); // temp, humidity, 

            // alert data...
            table.string('alert_data_type', 100);
            
            // reference
            table.string('reference', 100);

            // sensor ID...
            table.bigInteger('sensor_id');

            // the timestamp (UTC) of when the server noticed the alert (use create at)

            // the timestamp (UTC) of the original data that caused the alert
            table.timestamp('device_recorded_alert_at');

            // the timestamp (UTC) of when the alert is resolved (if it has been)
            table.timestamp('resolved_alert_at').nullable();

            /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
            table.timestamps(true, true);
        });
    }

    public async down() {
        this.schema.dropTable(this.tableName);
    }
}
