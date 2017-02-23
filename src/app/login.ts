import { Component, NgModule } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

export class LoginService {
  loggedIn: boolean = false;

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}

@Component({
  selector: 'login',
  template: `
    <h1>Login</h1>
    <button (click)="login()">LOGIN</button>
  `
})
export class LoginPage {
  constructor(private service: LoginService, private params: NavParams) {}

  login() {
    this.service.loggedIn = true;
    this.params.get('continueToTarget')();
  }
}

@NgModule({
  declarations: [LoginPage],
  entryComponents: [LoginPage],
  providers: [LoginService]
})
export class LoginModule {

}