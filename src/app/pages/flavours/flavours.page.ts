import { Component, OnInit } from '@angular/core';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AlertController } from '@ionic/angular';
import { Flavour, FlavourQueryService } from 'src/app/services/database/flavour-query.service';
import { PictureService } from 'src/app/services/storage/picture.service';

@Component({
  selector: 'app-flavours',
  templateUrl: './flavours.page.html',
  styleUrls: ['./flavours.page.scss'],
})
export class FlavoursPage implements OnInit {
  public flavours: Flavour[];

  constructor(
    private flavourQuery: FlavourQueryService,
    private alertController: AlertController,
    private webView: WebView,
    private picture: PictureService
  ) {}

  ngOnInit() {
    this.flavours = [];
  }

  /**
   * Refresh the available flavours when this component is viewed.
   */
  ionViewWillEnter() {
    this.refreshFlavours();
  }

  /**
   * Refreshes the available flavours and provides user feedback.
   */
  public sync() {
    this.refreshFlavours();
    this.presentSyncAlert();
  }

  /**
   * Queries the database for all available flavours and sorts them by their
   * name alphabetically.
   */
  private refreshFlavours() {
    this.flavourQuery.getAllFlavours().then((flavours: Flavour[]) => {
      this.flavours = flavours.sort((a, b) => {
        return (a.Name > b.Name) ? 1 : ((a.Name < b.Name) ? -1 : 0);
      });
    });
  }

  /**
   * Deletes the specified flavour from the database.
   * @param flavour The flavour that should be deleted.
   */
  private deleteFlavour(flavour: Flavour) {
      this.picture.deletePicture(flavour.PhotoName)
      // Catch it if it's not there anymore.
      .catch(() => {})
      // Delete the database entry.
      .then(() => this.flavourQuery.deleteFlavour(flavour))
      // Refresh our view dataset.
      .then(() => this.refreshFlavours());
  }

  /**
   * Presents the user with an alert that confirms the deletion of a flavour.
   * @param flavour The flavour that will be deleted.
   */
  async presentDeleteAlert(flavour: Flavour) {
    const alert = await this.alertController.create({
      header: 'Delete Flavour',
      message: `Are you sure you want to delete ${flavour.Name}?`,
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Delete',
        handler: () => {
          this.deleteFlavour(flavour);
        }
      }]
    });

    await alert.present();
  }

  /**
   * Presents a simple message that a sync has happened.
   */
  async presentSyncAlert() {
    const alert = await this.alertController.create({
      header: 'Sync',
      message: 'Syncing Completed!',
      buttons: ['OK']
    });

    await alert.present();
  }
}
