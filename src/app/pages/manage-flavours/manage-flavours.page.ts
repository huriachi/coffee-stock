import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Flavour, FlavourQueryService } from 'src/app/services/database/flavour-query.service';
import { PictureService } from 'src/app/services/storage/picture.service';

@Component({
  selector: 'app-manage-flavours',
  templateUrl: './manage-flavours.page.html',
  styleUrls: ['./manage-flavours.page.scss'],
})
export class ManageFlavoursPage implements OnInit {
  public id: string;
  public flavourForm: FormGroup;
  public flavour: Flavour;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private actionSheetController: ActionSheetController,
    private webView: WebView,
    private alertController: AlertController,
    private flavourQuery: FlavourQueryService,
    private activatedRoute: ActivatedRoute,
    private picture: PictureService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.initialize();

    if (this.id) {
      this.flavourQuery.getFlavour(this.id)
        .then((flavour) => {
          this.flavour = flavour;
          this.flavourForm.patchValue(flavour);
        });
    }
  }

  /**
   * Initializes our component defaults.
   */
  private initialize() {
    this.flavourForm = new FormGroup({
      ID: new FormControl(''),
      Barcode: new FormControl('', Validators.required),
      PhotoName: new FormControl(''),
      Name: new FormControl('', Validators.required),
      PricePerBox: new FormControl('', Validators.required),
      PricePerPod: new FormControl('', Validators.required),
      PodsPerBox: new FormControl('', Validators.required)
    });
    this.dynamicPricePerPod();
  }

  /**
   * Starts the barcode scanning process which allows for easy barcode entry.
   */
  public scanBarcode() {
    this.barcodeScanner.scan()
      .then((barcodeData) => {
        this.flavourForm.patchValue({Barcode: barcodeData.text});
      })
      .catch(() => {
        this.presentAlert('Oops',
          'There was a problem scanning the barcode. Please try again.'
        );
      });
  }

  /**
   * Presents options that allow the user to attach a picture to the flavour.
   */
  public async presentPictureOptions() {
    const buttons = [{
      text: 'Load from Library',
      handler: () => {
        this.picture.getPictureFromAlbum()
          .then((picture) => {
            this.flavourForm.patchValue({PhotoName: picture});
          })
          // The user probably canceled the process.
          .catch(() => {});
      }
    }, {
      text: 'Use camera',
      handler: () => {
        this.picture.getPictureFromCamera()
          .then((picture) => {
            this.flavourForm.patchValue({PhotoName: picture});
          })
          // The user probably canceled the process.
          .catch(() => {});
      }
    }, {
      text: 'Cancel',
      role: 'cancel'
    }];

    // Add the remove button if a picture is present.
    if (this.flavourForm.value.PhotoName) {
      buttons.unshift({
        text: 'Remove',
        handler: () => {
          this.flavourForm.patchValue({PhotoName: ''});
        }
      });
    }

    const actionSheet = await this.actionSheetController.create({buttons});
    await actionSheet.present();
  }

  /**
   * Subscribes to form elements to dynamically compute the price per pod.
   */
  private dynamicPricePerPod() {
    this.flavourForm.get('PricePerBox').valueChanges.subscribe((value) => {
      this.flavourForm.patchValue({
        PricePerPod: (value / this.flavourForm.value.PodsPerBox).toFixed(2)
      });
    });

    this.flavourForm.get('PodsPerBox').valueChanges.subscribe((value) => {
      this.flavourForm.patchValue({
        PricePerPod: (this.flavourForm.value.PricePerBox / value).toFixed(2)
      });
    });
  }

  /**
   * Persists the flavour picture and data.
   */
  public saveFlavour() {
    this.picture.savePicture(this.flavourForm.value.PhotoName)
      // Ignore it if no picture was given.
      .catch(() => {})
      // Add the flavour to the database.
      .then(() => this.flavourQuery.addFlavour(this.flavourForm.value))
      // Display a success message to the user.
      .then(() => {
        const name = this.flavourForm.value.Name;
        this.initialize();
        this.presentAlert('Add Flavour', `Flavour ${name} has been added.`);
      })
      // Display an error message to the user.
      .catch(() => {
        this.presentAlert('Oops',
          'There was a problem adding your flavour. Please try again.'
        );
      });
  }

  /**
   * Persists the edited flavour picture and data.
   */
  public editFlavour() {
    this.picture.updatePicture(this.flavourForm.value.PhotoName, this.flavour.PhotoName)
      // Ignore it if no picture was given.
      .catch(() => {})
      // Update the flavour in the database.
      .then(() => this.flavourQuery.updateFlavour(this.flavourForm.value))
      // Show the success to the user.
      .then(() => {
        const name = this.flavourForm.value.Name;
        this.presentAlert('Edit Flavour', `${name} has been edited succesfully.`);
      })
      // Show the failure to the user.
      .catch(() => {
        this.presentAlert('Oops',
          'There was a problem updating your flavour. Please try again.');
      });
  }

  /**
   * Presents a customizable alert that informs the user of something.
   * @param header The text that will display in the title of the alert.
   * @param message The text that will display in the body of the alert.
   */
  private async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }
}
