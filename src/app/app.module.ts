import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Camera } from "@ionic-native/camera/ngx";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from './api/login.service';
import { HttpClientModule } from '@angular/common/http';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { DatabaseService } from './services/database/database.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DatabaseService,
    Keyboard,
    Camera,
    BarcodeScanner,
    LoginService,
    StatusBar,
    SplashScreen,
    SQLite,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
