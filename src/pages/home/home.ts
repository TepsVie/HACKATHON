import { InformationPage } from './../information/information';
import { TraiteurPage } from './../traiteur/traiteur';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  pushTraiteur() {
    this.navCtrl.push(TraiteurPage)
  }

  pushInfo() {
    this.navCtrl.push(InformationPage)
  }
}
