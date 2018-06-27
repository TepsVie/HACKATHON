import { TraiteurMealsPage } from './../traiteur-meals/traiteur-meals';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-traiteur',
  templateUrl: 'traiteur.html',
})
export class TraiteurPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  pushMeals() {
    this.navCtrl.push(TraiteurMealsPage)
  }
}
