import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { AcuerdoPage } from '../acuerdo/acuerdo';
import { Passenger } from '../../users/fb.passenger';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  uid : any = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    public toastCtrl: ToastController,
    public passenger: Passenger,

  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
    this.menuCtrl.enable(false);
  }

  login(){
    this.afAuth.auth.signInAnonymously().catch(err =>{
      var errorCode = err.code;
      var errorMessage = err.message;

      if (errorCode === 'auth/operation-not-allowed') {
        alert('You must enable Anonymous auth in the Firebase Console.');
      } else {
        console.error(err);
      }
    
    }).then(()=>{
      this.uid = this.afAuth.auth.currentUser.uid;
      console.log(this.uid);
      this.navCtrl.setRoot(HomePage);
      let toast = this.toastCtrl.create({
        message: 'Bienvenido a Coletto, pasajero',
        duration: 3000,
        position: 'bottom',
        cssClass: 'toastLogout'
      });
      toast.present();
    })
    
    }
  
    signup(){
    //this.navCtrl.push(SignupPage);
    }

  aboutPage(){
    this.navCtrl.push(AboutPage)
  }

  toAcuerdoPage(){
    this.navCtrl.push(AcuerdoPage)
  }

}
