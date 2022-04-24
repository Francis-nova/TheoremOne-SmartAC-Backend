import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Device extends BaseModel {
  @column({ isPrimary: true })
    public id: number;

  @column()
  public serial_number: string;

  @column()
  public firmware_version: string;

  @column()
  public token: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
