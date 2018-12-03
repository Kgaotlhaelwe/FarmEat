import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FarmEatProvider } from '../../providers/farm-eat/farm-eat';
declare var google: any;
declare var firebase;
/**
 * Generated class for the AddFarmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-farm',
  templateUrl: 'add-farm.html',
})
export class AddFarmPage {

  url ;
  desLatLng;
  imageArr = [];
  name;
  address; 
  farmType; 
  description; 
  email; 
  phoneNo; 
  website; 
  facebook
  crops;
  livestock; 
  beekeeping;
  aquatic;
  constructor(public navCtrl: NavController, public navParams: NavParams, private farmEat:FarmEatProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFarmPage');
  }

  insertImage(event: any){
    this.url = event.target.files[0];
  }

  addFarm(){
    var downloadURL: any;
    var filename = this.url.name;
    const metaData = {'contentType': this.url.type};
    //create reference
    var storageRef = firebase.storage().ref().child(filename)
    //upload the selected image to the storage
    var uploadTask = storageRef.put(this.url, metaData)
    // Get the download URL
    storageRef.getDownloadURL().then((url) => {
      this.imageArr.push(url);
      console.log(this.imageArr);
    }).catch((error) => { 
    });

    const geocoder = new google.maps.Geocoder;
   

    var lat;
    var lng;
    geocoder.geocode({'address': this.address}, function(results, status) {
      if (status === 'OK') {
        this.desLatLng = results[0].geometry.location;
        console.log("Des method "+this.desLatLng);
        console.log(this.desLatLng);
        console.log("ghffdh"+this.desLatLng);
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
        console.log(lat);
        console.log(lng);
        
       } else {
         alert('Geocode was not successful for the following reason: ' + status);
       }
    });

    setTimeout(()=>{
      this.farmEat.addFarm(this.name, this.address, this.farmType, this.description, this.crops, this.livestock, this.beekeeping, this.aquatic, this.email, this.phoneNo, this.website, this.facebook, this.imageArr, lat, lng).then(()=>{
        alert("Farm Info Added")
      })
    }, 5000)
  }

}
