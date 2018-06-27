
import { MealGlobal } from './../../models/meal-global.model';
import { Http, Headers } from '@angular/http';
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

  token: any;
  idMeal: any;
  mealsGet: any;

  mealsInfo: MealGlobal = new MealGlobal;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public alertCtrl: AlertController, public http: Http) {

  }

  ionViewWillEnter() {
    this.token = this.navParams.get('tokenValue');
    this.getMealsLaunch();
  }

  addButton(i) {
    this.mealsInfo.data[i].action = (this.mealsInfo.data[i].action == 'Ajouter')?'Retirer':'Ajouter';
    /* if (this.mealsInfo.data[i].action == 'Ajouter') {
      this.txt = 'Retirer';
    } else if (this.txt = 'Ajouter') {
      console.log('go to next page');
      this.txt == 'Retirer'
    } */
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
            console.log(data.Nom);
            this.newMeal = data.Nom;
            this.postMeals();
          }
        }
      ]
    });
    prompt.present();
  }

  postMeals() {
    const url = `${this.baseUrl}`;
    let headers = new Headers();
    console.log(this.token)
    let tokenHeader = 'Bearer ' + this.token;
    headers.append("Accept", "application/json");
    headers.append("Authorization", tokenHeader);
    this.mealsTable = [];
    return this.http.post(url, { 'name': this.newMeal }, { headers: headers })
      .map(res => res.json())
      .subscribe((data) => {
        this.getMealsLaunch();
        this.mealsTable.push(data);
        console.log('Plats: ', this.mealsTable);
        return this.mealsTable
      })
  }

  getMealsLaunch() {
    this.getMealsInfo()
      .then(skillsFetched => {
        for (let i = 0; i < skillsFetched.data.length; i++) skillsFetched.data[i].action = 'Ajouter';
        this.mealsInfo = skillsFetched;

        console.log(this.mealsInfo.data);
      })
  }

  getMealsInfo(): Promise<any> {
    const url = 'http://groupe3.api/api/traiteur/myMeals';
    let headers = new Headers();
    let tokenHeader = 'Bearer ' + this.token;
    headers.append("Accept", "application/json");
    headers.append("Authorization", tokenHeader);

    return this.http.get(url, { headers: headers })
      .toPromise()
      .then(response => response.json() as MealGlobal)
      .catch(error => console.log('Une erreur est survenue ' + error))
  }

  postPictureMeal() {
    const url = 'http://groupe3.api/api/meal/uploadPicture';
    let headers = new Headers();
    let tokenHeader = 'Bearer ' + this.token;
    headers.append("Accept", "application/json");
    headers.append("Authorization", tokenHeader);
    this.mealsTable = [];
    return this.http.post(url, { 'meal_id': '', 'picture': '' }, { headers: headers })
      .map(res => res.json())
      .subscribe((data) => {
        this.getMealsLaunch();
        this.mealsTable.push(data);
        console.log('Plats: ', this.mealsTable);
        return this.mealsTable
      })
  }

  deleteMenu(arg) {
    const url = 'http://groupe3.api/api/meal/'+arg;
    let headers = new Headers();
    let tokenHeader = 'Bearer ' + this.token;
    headers.append("Accept", "application/json");
    headers.append("Authorization", tokenHeader);

    this.http.delete(url, { headers: headers })
    .subscribe(
      resp => { 
        console.log('Deleted Id: ', arg);
        this.getMealsLaunch() },
      error => console.log('error occur, delete fail')
    )
    
  }
}
