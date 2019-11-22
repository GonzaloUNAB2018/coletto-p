import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../pages/home/home';
import { AngularFireDatabase } from 'angularfire2/database';
import { Passenger } from '../users/fb.passenger';
import { NativeStorage } from '@ionic-native/native-storage';
import { IntroductionPage } from '../pages/introduction/introduction';
import { Toast } from '@ionic-native/toast';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any;
  look: boolean = false;
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
    public nativeStorage: NativeStorage,
    public toast: Toast
    ) {
      this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        //this.rootPage = WelcomePage;
        console.log(this.look);
        if(this.look === false){
          this.afAuth.auth.onAuthStateChanged(user=>{
            if (user){
              this.logged = true;
              this.nav.setRoot(IntroductionPage);
              this.look=true;
              console.log(this.look);
            }else{
              this.logged = false;
              this.nav.setRoot(WelcomePage);
              this.look=true;
              console.log(this.look);
            }
          })
        }else{
          this.nav.setRoot(WelcomePage);
          console.log(this.look);
        }
      });
  
      
  }

  logout(){
    this.uid = this.afAuth.auth.currentUser.uid;
    this.passenger.state = 0;
    this.afDb.object('Pasajero/'+this.uid).update(this.passenger);
    this.afAuth.auth.currentUser.delete().then(()=>{
      this.look=true;
      this.nav.setRoot(WelcomePage).then(()=>{
        if(this.platform.is('cordova')){
          this.toast.show(`Te esperamos`, '2000', 'bottom').subscribe(
            toast => {
              console.log(toast);
            }
          );
        }else{
          let toast = this.toastCtrl.create({
            message: 'Te esperamos',
            duration: 2000,
            position: 'bottom',
            cssClass: 'toastLogout'
          });
          toast.present();
        }
      });
    }).catch(error=> {
      alert(error)
    });
  }

  deleteDataStorage(){
    this.nativeStorage.remove('myitem')
    .then(
      () => console.log('Deleted item!'),
      error => console.error('Error storing item', error)
    );
  }
  
}
