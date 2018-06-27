import { TraiteurMealsPage } from './../traiteur-meals/traiteur-meals';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-traiteur',
  templateUrl: 'traiteur.html',
})
export class TraiteurPage {

  token: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.token = this.navParams.get('tokenValue');
  }
  pushMeals() {
    this.navCtrl.push(TraiteurMealsPage, { tokenValue: this.token.toString() })
  }
}
