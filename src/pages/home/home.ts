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

  traitorInfo: any;

  private baseUrl: string = 'http://groupe3.api/api/login';

  login = "";
  mdp = "";
  usertype: any;
  devInfos: UsersGlobal = new UsersGlobal;

  token: any;
  constructor(public navCtrl: NavController, private http: Http, private alertCtrl: AlertController) {

  }

  /* pushTraiteur() {
    this.navCtrl.push(TraiteurPage);
    this.auth();
  } */

  pushInfo() {
    this.navCtrl.push(InformationPage)
  }

  auth() {
    const url = `${this.baseUrl}`;

    let token: any;
    return this.http.post(url, { 'email': this.login, 'password': this.mdp })
      .map(res => res.json())
      .subscribe(
        (data) => {
          console.log('Information du traiteur: ', data);
          this.traitorInfo = data.success.id
          this.traitorInfo -= 1;
          token = data.success.token;
          this.getDevInfo();
          console.log('Identifiant "Rangée": ', this.traitorInfo);
          console.log('Token: ', token);
          return this.traitorInfo
        },
        (err) => {
          this.presentAlert();
        })
  }

  getDevInfo() {
    const url = `http://groupe3.api/api/users`;

    return this.http.get(url)
      .map(res => res.json())
      .subscribe((data) => {
        this.usertype = data.data[this.traitorInfo].userstype;
        console.log('Type: ', this.usertype);
        this.pushCondition();
      });

  }

  pushCondition() {
    if (this.usertype == 'Traiteur') this.navCtrl.push(TraiteurPage, { token })
    else if (this.usertype == 'Collaborateur') this.navCtrl.push(InformationPage)
    else (this.presentAlert())
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Email ou mot de passe',
      subTitle: 'incorrect',
      buttons: ['Oks']
    });
    alert.present();
  }
}
