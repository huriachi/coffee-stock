import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

export interface Flavour {
  ID?: number;
  Barcode: string;
  PhotoName: string;
  Name: string;
  PricePerBox: number;
  PricePerPod: number;
  PodsPerBox: number;
}

@Injectable({
  providedIn: 'root'
})
export class FlavourQueryService {

  constructor(private db: DatabaseService) {}

  /**
   * Adds a a flavour to our database.
   * @param flavour The flavour information that should be added.
   */
  public addFlavour(flavour: Flavour) {
    return this.db.connection.executeSql(`INSERT INTO Flavours
      (Barcode, Name, PricePerBox, PricePerPod, PodsPerBox, PhotoName)
      VALUES (?, ?, ?, ?, ?, ?)`, [
        flavour.Barcode,
        flavour.Name,
        +flavour.PricePerBox * 100,
        +flavour.PricePerPod * 100,
        +flavour.PodsPerBox * 100,
        flavour.PhotoName
      ]);
  }

  /**
   * Updates a flavour inside our database.
   * @param flavour The updated flavour information.
   */
  public updateFlavour(flavour: Flavour) {
    return this.db.connection.executeSql(`UPDATE Flavours
      SET
        Barcode = ?,
        Name = ?,
        PricePerBox = ?,
        PricePerPod = ?,
        PodsPerBox = ?,
        PhotoName = ?
      WHERE ID = ?`, [
        flavour.Barcode,
        flavour.Name,
        +flavour.PricePerBox * 100,
        +flavour.PricePerPod * 100,
        +flavour.PodsPerBox * 100,
        flavour.PhotoName,
        flavour.ID
      ]);
  }

  /**
   * Retrieves all flavours that are stored in the database.
   */
  public getAllFlavours() {
    return this.db.connection.executeSql('SELECT * FROM Flavours', [])
      .then(data => this.assignFlavour(data));
  }

  /**
   * Retrieves a specific flavour that is stored in the database.
   * @param flavourID The ID of the flavour that should be retrieved.
   */
  public getFlavour(flavourID: string | number): Promise<Flavour> {
    return this.db.connection.executeSql('SELECT * FROM Flavours WHERE ID = ?', [flavourID])
      .then(data => this.assignFlavour(data)[0]);
  }

  /**
   * Helper function that takes a database resultset and convers it into an
   * array of Flavour objects.
   * @param data The database resultset.
   */
  private assignFlavour(data) {
    const flavours: Flavour[] = [];
    for (let i = 0; i < data.rows.length; i++) {
      flavours.push({
        ID: data.rows.item(i).ID,
        Barcode: data.rows.item(i).Barcode,
        Name: data.rows.item(i).Name,
        PhotoName: data.rows.item(i).PhotoName,
        PodsPerBox: data.rows.item(i).PodsPerBox / 100,
        PricePerBox: data.rows.item(i).PricePerBox / 100,
        PricePerPod: data.rows.item(i).PricePerPod / 100
      });
    }
    return flavours;
  }

  /**
   * Deletes a flavour from the database.
   * @param flavour The flavour that should be deleted.
   */
  public deleteFlavour(flavour: Flavour) {
    return this.db.connection.executeSql('DELETE FROM Flavours WHERE ID = ?', [
      flavour.ID
    ]);
  }
}
