import {Component} from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loginForm: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public authProvider: AuthProvider) {
    this.loginForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.required]
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async loginSubmitForm(): Promise<any> {
    if (!this.loginForm.valid) {
      console.log('the form is not valid');
    } else {
      const loading: Loading = this.loadingCtrl.create();
      loading.present();
      try {
        const loginUser: firebase.User = await this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password);
        await loading.dismissAll();
        this.navCtrl.setRoot('TodoListPage');
      } catch (error) {
        await loading.dismissAll();
        console.log('error ' + error);
      }
    }
  }
}
