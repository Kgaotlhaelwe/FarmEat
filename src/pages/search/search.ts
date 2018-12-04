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


 searchQuery: string = '';
  items: string[];


 desLatLng

 searchArea = [
   
 

   





]
  

  constructor(public platform: Platform,public navCtrl: NavController, public navParams: NavParams,private keyboard: Keyboard) {
    this.platform.ready().then(() => {

     
    })
    
    console.log(this.keyboard.show());
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');

    this.keyboard.show();
  }

   search(address){

    
      new Promise((accpt,rej) =>{
        const geocoder = new google.maps.Geocoder;
      
        geocoder.geocode({'address': address}, (results, status)=> {
             if (status === 'OK') {
              this.desLatLng = results[0].geometry.location;
             console.log("Des method "+this.desLatLng);
              console.log(this.desLatLng);
              console.log("ghffdh"+this.desLatLng);
              this. lat = results[0].geometry.location.lat();
              this. lng = results[0].geometry.location.lng();
               console.log(this.lat);
               console.log(this.lng);
           
             let  trackno = 1 ;
              
               let coordinate= {
                lat:this.lat ,
                lng:this.lng ,
               
              }
        

              
                  let obj = {
              trackno:trackno
            }
        
            console.log(coordinate);
             
            searchArray[0]=obj
             console.log( searchArray);
            setTimeout(()=>{
              this.navCtrl.push(HomePage, {searchArea:coordinate})
            } , 5000)
         
          
              
              
         
              } else {
               alert('Geocode was not successful for the following reason: ' + status);
              }
              
           });
  
  
  
      })
    

  }



  initializeItems() {
    this.items = [
      
        "Soweto diepkloof" , "Soweto Maponya" ,
        "Soweto South gate Mall",
        "Midrand" ,
        "Braamfontein" ,
        

        
       
     
        
        
      ];
  }


  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }






}


var searchArray = new Array();


export default searchArray ;
