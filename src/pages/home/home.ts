import { Component } from '@angular/core';
import { NavController, App, MenuController, ToastController, AlertController, Platform, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {
  GoogleMaps,
  /*GoogleMap,
  GoogleMapOptions,
  Marker,
  LocationService,
  MyLocation*/
} from '@ionic-native/google-maps';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { AboutPage } from '../about/about';
import { Coletto } from '../../models/coletto';
import { NigthMapStyle } from '../../styles/night.style';
import { DayMapStyle } from '../../styles/day.style';
import { Paletas } from '../../publicidad/paletas';
import { Passenger } from '../../users/fb.passenger';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: any;
  uid : any = null;
  logged : boolean = false;
  coletto = {} as Coletto;
  colettoLineOptions = {};
  colettoASOptions = {};
  appSystem: boolean;
  pasajero = 'assets/imgs/GPS.png';
  paleta1 = 'assets/imgs/patrocinados/paletaFalabella.png';
  latitude: any;
  longitude: any;
  myLatLng: { 
    lat: number; 
    lng: number; 
  };
  mapEle: HTMLElement;
  mapOption: any;
  lineSelected: boolean;
  ruteSelected: boolean;
  buttonOpen: boolean;
  circle: { 
    center: { 
      lat: number;
      lng: number; 
    }; 
    location: number; 
  };
  cityCircle : any;
  passenger = {} as Passenger;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public app: App,
    public menuCtrl: MenuController,
    private afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase,
    public toastCtrl: ToastController,
    public googleMaps: GoogleMaps,
    private geolocation: Geolocation,
    public paletas: Paletas,
  ) {


  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true);
    this.uid = this.afAuth.auth.currentUser.uid;
    console.log(this.uid);
    if(this.platform.is('core') || this.platform.is('mobileweb')){
      this.appSystem = false;
      this.getPosition();
      this.lineSelected = true;
      this.ruteSelected = false;
      this.buttonOpen = false;
    }else{
      this.getPosition();
      this.appSystem = true;
      this.lineSelected = true;
      this.ruteSelected = false;
      this.buttonOpen = false;
    }
   
  }

//  #####  MAPA JAVASCRIPT  #####  //

  loadMap(position: Geoposition){
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    console.log(this.latitude, this.longitude);
    let style = []

    if(this.isNight()){
      style = NigthMapStyle
    }else{
      style = DayMapStyle
    }
    
    // create a new map by passing HTMLElement
    this.mapEle = document.getElementById('map');

    // create LatLng object
    this.myLatLng = {lat: this.latitude, lng: this.longitude};

    this.mapOption = {
      center: this.myLatLng,
      zoom: 15.5,
      tilt: 90,
      disableDefaultUI: true,
      scaleControl: true,
      styles: style,
    }
    
    // create map
    this.map = new google.maps.Map(this.mapEle, this.mapOption);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let paleta1 = new google.maps.Marker({
          icon: {
            url : this.paleta1,
            scaledSize: new google.maps.Size(50, 50),
          },
          position: {lat: -33.415698, lng: -70.607245},
          map: this.map,
      });

        let paleta2 = new google.maps.Marker({
          icon: {
            url : this.paleta1,
            scaledSize: new google.maps.Size(50, 50),
          },
          position: {lat: -33.037843, lng: -71.528353},
          map: this.map,
      });

        let paleta3 = new google.maps.Marker({
          icon: {
            url : this.paleta1,
            scaledSize: new google.maps.Size(50, 50),
          },
          position: {lat: -32.995767, lng: -71.501829},
          map: this.map,
      });
      let paleta4 = new google.maps.Marker({
          icon: {
            url : this.paleta1,
            scaledSize: new google.maps.Size(50, 50),
          },
          position: {lat: -33.024348, lng: -71.552374},
          map: this.map,
      });

      let marker = new google.maps.Marker({
        icon: {
          url : this.pasajero,
          scaledSize: new google.maps.Size(50, 50),
        },
        position: this.myLatLng,
        map: this.map,
        title: 'Hello World!'
        
      });

        
    });

    this.passenger.lat = this.latitude;
    this.passenger.lng = this.longitude;
    this.passenger.type = 'Pasajero';
    this.passenger.uid = this.uid;
    this.passenger.state = 1;
    this.afDb.object('Pasajero/'+this.uid).set(this.passenger);
  }

  getPosition():any{
    this.geolocation.getCurrentPosition().then(response => {
      this.loadMap(response);
      
    }).then(()=>{
      
    })
    .catch(error =>{
      console.log(error);
    })
  }

  toAboutPage(){
    this.navCtrl.push(AboutPage);
  }

  getCircle() {

    this.map.setZoom(13.5);
    this.map.setCenter(new google.maps.LatLng(this.myLatLng));

    this.circle = {
      center: this.myLatLng,
      location: 395,
    }

    if(this.isNight()){
      this.cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0,
        strokeWeight: 2,
        fillColor: '#8698CC',
        fillOpacity: 0.35,
        map: this.map,
        center: this.circle.center,
        radius: Math.sqrt(this.circle.location) * 100
      })
    }else{
      this.cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0,
        strokeWeight: 2,
        fillColor: '#CC8686',
        fillOpacity: 0.35,
        map: this.map,
        center: this.circle.center,
        radius: Math.sqrt(this.circle.location) * 100
      })
    }
  }

  lineaSelected(){
    this.getCircle();
    this.lineSelected = false;
    this.ruteSelected = true;
  }

  rutesSelected(){
    this.buttonOpen = true;
    const loader = this.loadingCtrl.create({
      content: "Recolectando información...",
      duration: 1500
    });
    loader.present().then(()=>{
        const alert = this.alertCtrl.create({
          title: '¡Sin Colettos Disponibles!',
          subTitle: 'Intente denuevo mas tarde',
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }
  back(){
    if(this.platform.is('core') || this.platform.is('mobileweb')){
      this.appSystem = false;
      this.lineSelected = true;
      this.ruteSelected = false;
      this.buttonOpen = false;
      this.coletto.rute = null;
      this.coletto.line = null;
      const loader = this.loadingCtrl.create({
        content: "Reiniciando...",
        duration: 1500
      });
      loader.present().then(()=>{
        this.getPosition();

      })
    }else{
      this.appSystem = true;
      this.lineSelected = true;
      this.ruteSelected = false;
      this.buttonOpen = false;
      this.coletto.rute = null;
      this.coletto.line = null;
      const loader = this.loadingCtrl.create({
        content: "Reiniciando...",
        duration: 1500
      });
      loader.present().then(()=>{
        this.getPosition();

      });
    }
  }
  isNight(){
    //Returns true if the time is between
    //7pm to 5am
    let time = new Date().getHours();
    return (time > 5 && time < 19) ? false : true;
  }
}
