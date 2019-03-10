import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/api/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  public submitting: boolean;
  public loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.submitting = false;
  }

  /**
   * When the user presses enter on the password field, we initiate login.
   * @param event The click event.
   */
  public enterLogin(event) {
    event.target.blur();
    this.formSubmit();
  }

  /**
   * Initiates the login process.
   */
  public formSubmit() {
    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((authenticated) => {
        if (authenticated) {
          this.router.navigate(['/flavours']).then(() => {
            this.loginForm.reset();
          });
        } else {
          this.loginFailedAlert('Invalid Credentials',
          'Please check that you have entered your username and password correctly.');
        }
      }, (error) => {
        this.loginFailedAlert('Login Failure',
          'There was a problem communicating with the server. Please try again later.');
      });
  }

  /**
   * Displays a message to the user regarding the login.
   * @param header The title of the alert.
   * @param message The contents in the body of the alert.
   */
  private async loginFailedAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Ok']
    });

    await alert.present();
  }
}
