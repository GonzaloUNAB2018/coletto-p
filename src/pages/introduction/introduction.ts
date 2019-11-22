import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-introduction',
  templateUrl: 'introduction.html',
})
export class IntroductionPage {

  /*slides = [
    {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "./assets/imgs/001.jpg",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "./assets/imgs/001.jpg",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "./assets/imgs/001.jpg",
    }
  ];*/


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroductionPage');
  }

  goToHomePage(){
    let load = this.loadingCtrl.create({
      content: 'Ingresando a la aplicación'
    });
    let load2 = this.loadingCtrl.create({
      content: 'Configurando primer ingreso'
    });
    load.present();

    setTimeout(() => {
      load.dismiss().then(()=>{
        load2.present();
        setTimeout(() => {
          this.navCtrl.setRoot(HomePage).then(()=>{
            load2.dismiss();
          });
        }, 3000);
      })
    }, 1000);
  }

}
