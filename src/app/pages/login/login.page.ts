import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/api/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  submitting: boolean = false;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private loginService: LoginService) {}

  ngOnInit() {}

  // Handles the enter event on the password field.
  enterLogin(event) {
    event.target.blur();
    this.formSubmit();
  }

  // Submits the login request to our remote endpoint.
  formSubmit() {
    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password);
  }
}
