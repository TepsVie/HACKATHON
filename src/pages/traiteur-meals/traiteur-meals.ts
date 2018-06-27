
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
  idMenu: any;
  mealsGet: any;
  date: any;

  mealsInfo: MealGlobal = new MealGlobal;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public alertCtrl: AlertController, public http: Http) {

  }

  ionViewWillEnter() {
    this.token = this.navParams.get('tokenValue');
    this.date = this.navParams.get('date');
    this.getMealsLaunch();
  }

  addButton(i, arg) {
    this.mealsInfo.data[i].action = (this.mealsInfo.data[i].action == 'Ajouter') ? 'Retirer' : 'Ajouter';
    this.idMeal = arg;


    if (this.mealsInfo.data[i].action == 'Retirer') {
      this.addMenu();
    } else
      this.deleteMenu();
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
            console.log(this.date);
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
      .then(mealsFetched => {
        for (let i = 0; i < mealsFetched.data.length; i++) mealsFetched.data[i].action = 'Ajouter';
        this.mealsInfo = mealsFetched;

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
        console.log('Photo ajouté');
        return this.mealsTable
      })
  }

  deleteMeal(arg) {
    const url = 'http://groupe3.api/api/meal/' + arg;
    let headers = new Headers();
    let tokenHeader = 'Bearer ' + this.token;
    headers.append("Accept", "application/json");
    headers.append("Authorization", tokenHeader);

    this.http.delete(url, { headers: headers })
      .subscribe(
        resp => {
          console.log('Deleted Id: ', arg);
          console.log('Meal supprimé');
          this.getMealsLaunch()
        },
        error => console.log('error occur, delete fail')
      )
  }

  addMenu() {
    const url = 'http://groupe3.api/api/menu/create';
    let headers = new Headers();
    console.log(this.date)
    let tokenHeader = 'Bearer ' + this.token;
    headers.append("Accept", "application/json");
    headers.append("Authorization", tokenHeader);
    this.mealsTable = [];
    return this.http.post(url, { 'meal_id': this.idMeal, 'date': this.date }, { headers: headers })
      .map(res => res.json())
      .subscribe((data) => {
        this.mealsTable.push(data);
        this.idMenu = data.id;
        console.log('Plats: ', this.mealsTable);
        console.log('Menu crée');
        return this.mealsTable
      })
  }


  deleteMenu() {
    const url = 'http://groupe3.api/api/menu/' + this.idMenu;
    let headers = new Headers();
    console.log('Id du Menu: ',this.idMenu)
    let tokenHeader = 'Bearer ' + this.token;
    headers.append("Accept", "application/json");
    headers.append("Authorization", tokenHeader);
    this.mealsTable = [];
    return this.http.delete(url, { headers: headers })
      .map(res => res.json())
      .subscribe((data) => {
        this.mealsTable.push(data);
        console.log('Menu: ', this.mealsTable);
        console.log('Menu supprimé')
        return this.mealsTable
      })
  }


}
