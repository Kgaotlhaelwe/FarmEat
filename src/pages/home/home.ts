
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, GESTURE_GO_BACK_SWIPE } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {FarmEatProvider} from '../../providers/farm-eat/farm-eat'
import { DescriptionPage } from '../description/description';
import { SearchPage } from '../search/search';
import searchArray from '../search/search'
import { AlertController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
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
  nearbyArray = new Array() ;

  searchArea = this.navParams.get("searchArea");

  trackSearch = [] ;
  nearbySeachFarmArray = [] ;
  @ViewChild(Slides) slides: Slides;

  icon ;
  
  newAddress;
  desLatLng;
  newLat;
  newLng;



  constructor(public navCtrl: NavController,  public navParams: NavParams, private geo: Geolocation, private farmEatDb:FarmEatProvider,public alertCtrl: AlertController) {



 
  }
 
 
 ionViewDidEnter() {
 
  if(this.trackSearch.length == 0){
    console.log("firstload");
    

    this.getCurrentLocation()
  }else{

    this.search() ;
  }
   

}
 loadMap(lat , lng){

  if(this.trackSearch.length == 0){

    const options = {
      center: {lat: this.lat, lng: this.lon},
      zoom: 10,
  
      styles: [
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
       ]
      
      //streetViewControl: false,
      //mapTypeId: 'satellite'
     }
    
     this.map = new google.maps.Map(this.mapRef.nativeElement, options);

     console.log(options);
     
    }


    let marker = new google.maps.Marker({
      map: this.map,
      zoom: 10,
      
      animation: google.maps.Animation.BOUNCE,
         icon: {
           url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"},
           position: this.map.getCenter()
     });
}
 


slideChanged(){
  let currentIndex = this.slides.getActiveIndex();
  let currentLat = this.nearbyArray[currentIndex].lat
  let currentLon = this.nearbyArray[currentIndex].lng


  let marker = new google.maps.Marker({
   // map: this.map,
     //icon: iconBase + 'farm_maps.png',
    
   
    position:  this.map.setCenter({lat: parseFloat( currentLat),lng:parseFloat( currentLon)}),
    animation: google.maps.Animation.DROP,
    label:name ,
    zoom:20 ,


  })


 


  console.log(currentLat);
  
}



getCurrentLocation(){

  this.geo.getCurrentPosition().then((position) => {
    console.log(position)
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;

    this.loadMap( this.lat, this.lon)

})

}

search(){

    
  new Promise((accpt,rej) =>{
    const geocoder = new google.maps.Geocoder;
  
    geocoder.geocode({'address': this.newAddress}, (results, status)=> {
         if (status === 'OK') {
          this.desLatLng = results[0].geometry.location;
         
          this.newLat = results[0].geometry.location.lat();
          this.newLng = results[0].geometry.location.lng();
           
       } else {
           alert('Geocode was not successful for the following reason: ' + status);
          }
          
       });
})
this.trackSearch[0] = 1 ;

this.loadMap( this.newLat,   this.newLng)


}


}


var searchedArray = new Array()

export  default searchArray ; 

