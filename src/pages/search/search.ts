import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { HomePage } from '../home/home';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


 declare var google 
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
 lat  ;
 lng
 trackno = 1 ;

  constructor(public platform: Platform,public navCtrl: NavController, public navParams: NavParams,private keyboard: Keyboard) {
    this.platform.ready().then(() => {

      this.keyboard.show();
    })
    
    console.log(this.keyboard.show());
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  search(address){
    

    const geocoder = new google.maps.Geocoder;
    
    geocoder.geocode({'address': address}, function(results, status) {
         if (status === 'OK') {
          this.desLatLng = results[0].geometry.location;
         console.log("Des method "+this.desLatLng);
           console.log(this.desLatLng);
           console.log("ghffdh"+this.desLatLng);
          this. lat = results[0].geometry.location.lat();
          this. lng = results[0].geometry.location.lng();
           console.log(this.lat);
           console.log(this.lng);
   
          } else {
           alert('Geocode was not successful for the following reason: ' + status);
          }
          
       });

      setTimeout(()=>{
        

      }, 5000)
       

       let coordinate= {
         lat:this.lat ,
         lng:this.lng ,
         trackNo:this.trackno
       }

    //    let obj = {
    //      trackno:this.trackno
    //    }

    console.log(coordinate);
     
    //    this.navCtrl.push(HomePage, {  searchArea:coordinate})
    //    searchArray[0]=obj
     
  }


}


var searchArray = new Array();


export default searchArray ;
