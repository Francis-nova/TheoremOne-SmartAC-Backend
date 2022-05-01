import { DateTime } from 'luxon';
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Report from 'App/Models/Report';

export default class Alert extends BaseModel {
  @column({ isPrimary: true })
    public id: number;

  @column()
  public serial_number: string;

  // the timestamp (UTC) of the original data that caused the alert
  @column()
  public device_recorded_alert_at: DateTime;

  // the timestamp (UTC) of when the alert is resolved (if it has been)
  @column()
  public resolved_alert_at: DateTime;

  // the textual alert
  @column()
  public alert_note: string;

  // a reference to the stored sensor values (or the serial number + timestamp are sufficient to find the record)
  @column()
  public reference: string;

  // the view state of an alert (new vs. viewed)
  @column()
  public alert_state: string;

  @column()
  public alert_data_type: string;

  @column()
  public alert_sensor: string;

  // the resolve state of the alert (new, resolved, ignored )
  @column()
  public resolve_state: string;

  @column()
  public sensor_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Report, {
      // foreignKey: 'sensor_id', // relation...
      localKey: 'sensor_id',
  })
  public sensors: HasMany<typeof Report>;

}
