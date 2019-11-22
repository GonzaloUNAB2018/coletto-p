import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
//import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { AcuerdoPage } from '../acuerdo/acuerdo';
import { Passenger } from '../../users/fb.passenger';
import { NativeStorage } from '@ionic-native/native-storage';
import { IntroductionPage } from '../introduction/introduction';
import { Toast } from '@ionic-native/toast';

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
    public toastCtrl: ToastController,
    public passenger: Passenger,
    private nativeStorage: NativeStorage,
    public platform: Platform,
    public toast: Toast
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
    this.menuCtrl.enable(false);
  }

  login(){
    this.afAuth.auth.signInAnonymously().then(()=>{
      //let root
      if(this.platform.is('cordova')){
        /*this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
        .then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error));*/

        //setTimeout(() => {
          this.nativeStorage.getItem('myitem').then(data => {
            console.log(data)
            if(data===null){
              this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
              .then(
                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)
              );
              this.navCtrl.setRoot(IntroductionPage);
            }else{
              console.log(this.uid);
              this.navCtrl.setRoot(HomePage);
              if(this.platform.is('cordova')){
                this.toast.show(`Bienvenido a Coletto, pasajero`, '3000', 'bottom').subscribe(
                  toast => {
                    console.log(toast);
                  }
                );                
              }else{
                let toast = this.toastCtrl.create({
                  message: 'Bienvenido a Coletto, pasajero',
                  duration: 3000,
                  position: 'bottom',
                  cssClass: 'toastLogout'
                });
                toast.present();
              }
            }
          },
          ).catch(e=>{
            console.log(e);
            this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
              .then(
                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)
              );
              this.navCtrl.setRoot(IntroductionPage);
          })
        //}, 1000);
        //this.nativeStorage.getItem('myitem')
      }else{
        this.navCtrl.setRoot(IntroductionPage);
        /*console.log(this.uid);
        this.navCtrl.setRoot(HomePage);
        let toast = this.toastCtrl.create({
          message: 'Bienvenido a Coletto, pasajero',
          duration: 3000,
          position: 'bottom',
          cssClass: 'toastLogout'
        });
        toast.present();*/
      }
    }).catch(err =>{
      var errorCode = err.code;
      if (errorCode === 'auth/operation-not-allowed') {
        alert('You must enable Anonymous auth in the Firebase Console.');
      } else {
        console.error(err);
      }
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
