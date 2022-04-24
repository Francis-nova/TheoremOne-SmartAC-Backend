import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Alert extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public serial_number: string

  // the timestamp (UTC) of the original data that caused the alert
  @column()
  public device_recorded_alert_at: DateTime;

  // the timestamp (UTC) of when the alert is resolved (if it has been)
  @column()
  public resolved_alert_at: DateTime;

  // the textual alert
  @column()
  public alert_note: String;

  // a reference to the stored sensor values (or the serial number + timestamp are sufficient to find the record)
  @column()
  public reference: String;

  // the view state of an alert (new vs. viewed)
  @column()
  public alert_state: String;

  // the resolve state of the alert (new, resolved, ignored )
  @column()
  public resolve_state: String;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
