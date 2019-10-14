import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../pages/home/home';
import { AngularFireDatabase } from 'angularfire2/database';
import { Passenger } from '../users/fb.passenger';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  //rootPage: any;
  pages: Array<{title: string, component: any}>;

  logged: boolean;
  uid: string;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase,
    public toastCtrl: ToastController,
    public passenger: Passenger,
    ) {
    this.initializeApp();
    
    
    // used for an example of ngFor and navigation
    this.pages = [
      /*{ title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }*/
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.afAuth.auth.onAuthStateChanged(user=>{
      if (user){
        this.logged = true;
        this.nav.setRoot(HomePage);
      }else{
        this.logged = false;
        this.nav.setRoot(WelcomePage);
      }
    })

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){
    this.uid = this.afAuth.auth.currentUser.uid;
    this.passenger.state = 0;
    this.afDb.object('Pasajero/'+this.uid).update(this.passenger);
    this.afAuth.auth.currentUser.delete().then(()=>{
      this.nav.setRoot(WelcomePage).then(()=>{
        let toast = this.toastCtrl.create({
          message: 'Te esperamos',
          duration: 2000,
          position: 'bottom',
          cssClass: 'toastLogout'
        });
        toast.present();
      });
    }).catch(function(error) {
      // An error happened.
    });
  }
  
}
