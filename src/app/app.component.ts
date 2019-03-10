import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { DatabaseService } from './services/database/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private keyboard: Keyboard,
    private database: DatabaseService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.database.initialize();

      this.keyboard.onKeyboardWillShow().subscribe(() => {
        document.body.classList.add('hide-on-keyboard-open');
      });

      this.keyboard.onKeyboardWillHide().subscribe(() => {
        document.body.classList.remove('hide-on-keyboard-open');
      });
    });
  }
}
