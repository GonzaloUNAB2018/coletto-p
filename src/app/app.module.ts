import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AboutPageModule } from '../pages/about/about.module';
import { AcuerdoPageModule } from '../pages/acuerdo/acuerdo.module';
import { WelcomePageModule } from '../pages/welcome/welcome.module';
import { IntroductionPage } from '../pages/introduction/introduction';
import { Paletas } from '../publicidad/paletas';
import { Passenger } from '../users/fb.passenger';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';
import { Toast } from '@ionic-native/toast';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

const firebaseConfig = {
  apiKey: "AIzaSyDaRTTHOVxs0RwAw9baRO6_6JSGiipTQu8",
  authDomain: "coletto-app.firebaseapp.com",
  databaseURL: "https://coletto-app.firebaseio.com",
  projectId: "coletto-app",
  storageBucket: "coletto-app.appspot.com",
  messagingSenderId: "953525692835",
  appId: "1:953525692835:web:985b4ab468d89643c0d216"

};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    IntroductionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AboutPageModule,
    AcuerdoPageModule,
    WelcomePageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    IntroductionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    Paletas,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Passenger,
    NativeStorage,
    Toast
  ]
})
export class AppModule {}
