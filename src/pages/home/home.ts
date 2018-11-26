import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapRef: ElementRef;
  map: any;
  lat: number;
  lon: number;

  constructor(public navCtrl: NavController, private geo: Geolocation) {
    this.loadMap();
  }

  loadMap(){
    this.geo.getCurrentPosition().then((position) => {
      console.log(position);
      
      //current location coordinates
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;    

       //map options
       const options = {
        center: {lat: this.lat, lng:  this.lon},
        zoom: 17,
        streetViewControl: false,
        //mapTypeId: 'satellite'
      }

      this.map = new google.maps.Map(this.mapRef.nativeElement, options);
      this.addMarker();
    })
  }

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
   
    //let content = "<h4>Information!</h4>";         
   
    //this.addInfoWindow(marker, content);
   
  }

}
