import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Reports extends BaseSchema {
    protected tableName = 'reports';

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');

            // the serial number of the device...
            table.string('serial_number', 32);

            // readings
            table.decimal('temperature', 8, 2);
            table.decimal('humidity', 8, 2);
            table.decimal('carbon_monoxide', 8, 2);

            // the timestamp (UTC) the device recorded the reading
            table.timestamp('device_recorded_at');

            // health status
            table.enu('health_status', ['OK', 'needs_service', 'needs_filter'], {
                useNative: true,
                existingType: false,
                enumName: 'report_health_status',
            });

            /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
            table.timestamps(true, true);
        });
    }

    public async down () {
        this.schema.dropTable(this.tableName);
    }
}
