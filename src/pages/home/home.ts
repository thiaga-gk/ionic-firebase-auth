import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  login(): void {
    this.navCtrl.push('LoginPage')
  }

  signUpUsers(): void {
    this.navCtrl.push('CreateAccountPage')
  }
}
