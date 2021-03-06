import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Report extends BaseModel {
  @column({ isPrimary: true })
    public id: number;

  @column()
  public serial_number: string;

  @column()
  public temperature: number;

  @column()
  public humidity: number;

  @column()
  public carbon_monoxide: number;

  @column()
  public health_status: string;

  @column()
  public device_recorded_at: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
