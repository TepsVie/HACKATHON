import { MenuGlobal } from './../../models/menu-global.model';
import { TraiteurMealsPage } from './../traiteur-meals/traiteur-meals';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
@Component({
  selector: 'page-traiteur',
  templateUrl: 'traiteur.html',
})
export class TraiteurPage {

  token: any;
  menuInfos = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

  }

  ionViewWillEnter() {
    this.token = this.navParams.get('tokenValue');
    this.getListMenuLaunch();
  }
  pushMeals(arg) {
    this.navCtrl.push(TraiteurMealsPage, {
      tokenValue: this.token.toString(),
      date: arg
    })
  }

  getListMenuLaunch() {
    this.getListMenu()
      .then(menuFetched => {
        this.menuInfos = menuFetched;
        console.log(this.menuInfos);
      })
  }

  getListMenu(): Promise<any> {
    const url = 'http://groupe3.api/api/menus/traiteur';
    let headers = new Headers();
    let tokenHeader = 'Bearer ' + this.token;
    headers.append("Accept", "application/json");
    headers.append("Authorization", tokenHeader);

    return this.http.get(url, { headers: headers })
      .toPromise()
      .then(response => response.json() as MenuGlobal)
      .catch(error => console.log('Une erreur est survenue ' + error))
  }

}
