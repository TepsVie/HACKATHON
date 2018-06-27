import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-traiteur-meals',
  templateUrl: 'traiteur-meals.html',
})
export class TraiteurMealsPage {

  valeur: any;

  txt = 'ajouter';
  newMeal: string;
  mealsTable = [];
  private baseUrl: string = 'http://groupe3.api/api/meal/create';


  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public alertCtrl: AlertController, public http: Http) {

  }

  check() {
    if (this.txt == 'ajouter') {
      //do some logic
      this.txt = 'retirer';
    } else if (this.txt = 'ajouter') {
      console.log('go to next page');
      this.txt == 'retirer'
    }
  }

  getValue(arg) {
    this.presentToast();
    this.valeur = arg;
    console.log()
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Nom du plat',
      inputs: [
        {
          name: 'Nom',
          placeholder: 'Nom'
        },
      ],
      buttons: [
        {
          text: 'Retour',
          handler: data => {
            console.log('Retour clicked');
          }
        },
        {
          text: 'Ajouter',
          handler: data => {
            console.log(data);
            this.newMeal = data;
            this.postMeals;
          }
        }
      ]
    });
    prompt.present();
  }

  postMeals() {
    const url = `${this.baseUrl}`;
    this.mealsTable = [];
    return this.http.post(url, { 'name': this.newMeal }, {headers: 
      { 'Accept':	"application/json",
    "Authorization":	"Bearer"
    }
  })
      .map(res => res.json())
      .subscribe((data) => {
        this.mealsTable.push(data);
        console.log('Plats: ', this.mealsTable);
        return this.mealsTable
      })
  }
}
