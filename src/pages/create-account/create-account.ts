import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {

  private registerForm: FormGroup;
  private loading: any;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public authProvider: AuthProvider) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      fName: ['', Validators.compose([Validators.required])],
      lName: ['', Validators.compose([Validators.required])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }

  registerSubmitForm(): void {

    if (!this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.loading.dismiss();
    } else {
      this.authProvider.signUpUser(this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.fName,
        this.registerForm.value.lName)
        .then(authData => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot('TodoListPage');
          })
        }, error => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: 'Ok',
                role: 'Cancel'
              }
            ]
          });
          alert.present();
        });
    }
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
}
