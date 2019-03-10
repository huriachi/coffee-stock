import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IonicModule } from '@ionic/angular';
import { ManageFlavoursPage } from './manage-flavours.page';

const routes: Routes = [
  {
    path: '',
    component: ManageFlavoursPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [ManageFlavoursPage],
  providers: [
    BarcodeScanner
  ]
})
export class ManageFlavoursPageModule {}
