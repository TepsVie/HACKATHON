
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Page
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TraiteurPage } from './../pages/traiteur/traiteur';
import { TraiteurMealsPage } from './../pages/traiteur-meals/traiteur-meals';
import { InformationPage } from './../pages/information/information';
import { HttpModule } from '@angular/http';


//Plugins
import { Push } from '@ionic-native/push';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TraiteurPage,
    TraiteurMealsPage,
    InformationPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TraiteurPage,
    TraiteurMealsPage,
    InformationPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
