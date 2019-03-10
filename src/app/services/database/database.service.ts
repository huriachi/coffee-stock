import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private _connection: SQLiteObject;

  constructor(private sqlite: SQLite) {}

  /**
   * Initialize the database connection and create default tables.
   */
  public initialize(): void {
    this.openDatabase()
      .then((database: SQLiteObject) => {
        this._connection = database;
        database.executeSql(`CREATE TABLE IF NOT EXISTS Flavours
          (
            ID INTEGER PRIMARY KEY,
            Barcode TEXT NOT NULL,
            Name TEXT NOT NULL,
            PricePerBox INTEGER NOT NULL,
            PricePerPod INTEGER NOT NULL,
            PodsPerBox INTEGER NOT NULL,
            PhotoName TEXT
          )`, [])
            .catch((error) => {
              console.log(error);
            });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Opens the database connection.
   */
  private openDatabase(): Promise<SQLiteObject> {
    return this.sqlite.create({
      name: 'CoffeeStock.db',
      location: 'default'
    });
  }

  get connection(): SQLiteObject {
    return this._connection;
  }
}
