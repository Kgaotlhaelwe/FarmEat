import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {FarmEatProvider} from '../../providers/farm-eat/farm-eat'

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

  constructor(public navCtrl: NavController, private geo: Geolocation, private farmEatDb:FarmEatProvider) {

    this.farmEatDb.getCurrentLocation().then((radius:any)=>{
      this.farmEatDb.getallFarms().then((data:any)=>{
        console.log(data);
        console.log(radius);
        
        
        this.farmEatDb.getNearByOrganizations(radius ,data).then((data:any)=>{
        console.log(data);

        this.nearbyArray =data ;
        console.log(this.nearbyArray);
        

         })
    
     })
      
    })
    
    this.loadMap();
    


   
    
  }



  ionViewDidEnter() {
    
  }

  loadMap(){


   
    this.geo.getCurrentPosition().then((position) => {
      console.log(position);
      
      //current location coordinates
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude; 
      
      console.log(this.lat);
      console.log(this.lon);
      
      

       //map options
       const options = {
        center: {lat: this.lat, lng:  this.lon},
        zoom: 17,
        streetViewControl: false,
        //mapTypeId: 'satellite'
      }

   
      this.map = new google.maps.Map(this.mapRef.nativeElement, options);
     console.log(this.nearbyArray);
     

      for (let index = 0; index < this.nearbyArray.length; index++) {
        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: {lat:this.nearbyArray[index].lat,lng:this.nearbyArray[index].lng}
        });

        console.log(marker.position);
        




        
        
  }

  this.addMarker();  

})
  }

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
   
}


nearbyFarm(){
//   this.farmEatDb.getallFarms().then((data:any)=>{
//     console.log(data);
//     this.farmEatDb.getCurrentLocation().then((radius:any)=>{
//       console.log(radius);
      
//       this.farmEatDb.getNearByOrganizations(radius ,data).then((data)=>{
//         console.log(data);
        

//       })
//     })
//   })



}



}
