import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Devices extends BaseSchema {
    protected tableName = 'devices';

    public async up () {
        this.schema.createTable(this.tableName, (table) => {

            // increments
            table.increments('id');
      
            // the serial number (alpha numeric 24-32 characters)
            table.string('serial_number', 32).unique();

            // the most recent firmware version (semantic versioning) e.g 1.0.0, 1.0.1
            table.string('firmware_version', 15);

            // token
            table.string('token', 250).unique();

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
