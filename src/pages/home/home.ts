import { UsersGlobal } from './../../models/users-global.model';
import { InformationPage } from './../information/information';
import { TraiteurPage } from './../traiteur/traiteur';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  value: string;
  idDev = [];

  traiteurInfo: any;

  private baseUrl: string = 'http://groupe3.api/api/login';

  login = "";
  mdp = "";
  usertype: any;
  devInfos: UsersGlobal = new UsersGlobal;

  token: any;

  constructor(public navCtrl: NavController, private http: Http, private alertCtrl: AlertController) {

  }

  pushInfo() {
    this.navCtrl.push(InformationPage)
  }

  auth() {
    const url = `${this.baseUrl}`;
    return this.http.post(url, { 'email': this.login, 'password': this.mdp })
      .map(res => res.json())
      .subscribe(
        (data) => {
          console.log('Information du traiteur: ', data);
          this.traiteurInfo = data.success.userstype_id;
          this.token = data.success.token;
          this.pushCondition();
          console.log('Identifiant "UserType": ', this.traiteurInfo);
          console.log('Token: ', this.token);
          return this.traiteurInfo
        },
        (err) => {
          this.presentAlert();
        })
  }

  pushCondition() {
    if (this.traiteurInfo == 1 ) this.navCtrl.push(TraiteurPage, { tokenValue: this.token.toString() })
    else if (this.traiteurInfo == 2 ) this.navCtrl.push(InformationPage)
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Email ou mot de passe',
      subTitle: 'incorrect',
      buttons: ['Ok']
    });
    alert.present();
  }
}
