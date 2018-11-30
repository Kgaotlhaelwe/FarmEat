
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {FarmEatProvider} from '../../providers/farm-eat/farm-eat'
import { DescriptionPage } from '../description/description';
import { SearchPage } from '../search/search';
import searchArray from '../search/search'
import { AlertController } from 'ionic-angular';
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

  trackSearch =searchArray ;
  nearbySeachFarmArray = [] ;


  constructor(public navCtrl: NavController,  public navParams: NavParams, private geo: Geolocation, private farmEatDb:FarmEatProvider,public alertCtrl: AlertController) {



 
  }
 
 
 ionViewDidEnter() {
 
 if(this.trackSearch.length == 0){
      this.farmEatDb.getCurrentLocation().then((radius:any)=>{
        console.log(radius);
        
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
    }else if(this.trackSearch.length ==1){
     
      
      this.farmEatDb.getSearchbyFarms(this.searchArea.lat,this.searchArea.lng).then((radius:any)=>{
        console.log(radius);

        this.farmEatDb.getallFarms().then((data:any)=>{
          console.log(data);

          

          this.farmEatDb.getSearchedFarm(this.searchArea.lat,this.searchArea.lng,radius ,data).then((data:any)=>{
            console.log(data);

            this.nearbySeachFarmArray =data ;
            console.log(this.nearbySeachFarmArray);


            if(this.nearbySeachFarmArray.length == 0){
              const alert = this.alertCtrl.create({
                title: 'Confirmation',
                subTitle: 'Currently we dont have Farms around your Area',
                buttons: ['OK']
              });
              alert.present();

             
            }else{

        
            
          }



             })



        })
        
      })
    
        
      
      

    


    }

   

    setTimeout(()=>{
      this.loadMap();


    }, 5000)
    
    
    


  
  
  
 }
 loadMap(){
  
  this.geo.getCurrentPosition().then((position) => {
   console.log(position)
   this.lat = position.coords.latitude;
   this.lon = position.coords.longitude; 
    //map options
    const options = {
    center: {lat: this.lat, lng: this.lon},
    zoom: 10,
    streetViewControl: false,
    //mapTypeId: 'satellite'
   }
  
   this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  
   if(this.trackSearch.length == 0){
  
   
  // var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
   let marker = new google.maps.Marker({
    map: this.map,
    zoom: 8 ,
    //icon: iconBase + 'info-i_maps.png',
   //animation: google.maps.Animation.DROP,
    
    animation: google.maps.Animation.BOUNCE,
       icon: {
         url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"},
         position: this.map.getCenter()
   });
   
   
  }else if(this.trackSearch.length ==1){
   console.log("second if statata");
   

    let a = this.searchArea.lat ;
   let b = this.searchArea.lng
  
   
   
   
   let marker = new google.maps.Marker({
    map: this.map,
    zoom: 8 ,
    // animation: google.maps.Animation.DROP,
    position: {lat: parseFloat(a),lng:parseFloat(b)}
   });




   for (let index = 0; index < this.nearbySeachFarmArray.length; index++) {
  
        
 
  let searchFarm = new google.maps.Marker({
      map: this.map,
      //icon:"../../assets/imgs/498229.svg" ,
     
     //animation: google.maps.Animation.DROP,
     position: {lat: parseFloat(this.nearbySeachFarmArray[index].lat),lng:parseFloat(this.nearbySeachFarmArray[index].lng)} ,
     label:name ,
     zoom:8
   });


   searchFarm.addListener('click' , ()=>{
     alert('kb')
   })
  


  }  
   


   
   
  }
  
  
   
   for (let index = 0; index < this.nearbyArray.length; index++) {
    console.log(this.nearbyArray);
    
    console.log(this.nearbyArray[index].lat);
    console.log(this.nearbyArray[index].lng);
    console.log(this.nearbyArray[index].name);
    
   
   
   
   
    
    // console.log(lat +" "+lng);
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
    let abmarker = new google.maps.Marker({
     map: this.map,
     //icon: iconBase + 'farm_maps.png',
    
    //animation: google.maps.Animation.DROP,
    position: {lat: parseFloat(this.nearbyArray[index].lat),lng:parseFloat(this.nearbyArray[index].lng)},
    label:name ,
    zoom:8
   });
  
    
   abmarker.addListener('click' , ()=>{
     alert(this.nearbyArray[index ].name)
    // var lat = this.nearbyArray[index].lat
    // var lon = this.nearbyArray[index].lng
     var name =this.nearbyArray[index].name ;
     var description = this.nearbyArray[index].description ;
     var tel =this.nearbyArray[index].tel ;
     var email =this.nearbyArray[index].email ;
     var address = this.nearbyArray[index].address;
     var facebook = this.nearbyArray[index].facebook;
     var beeKeeping = this.nearbyArray[index].beeKeeping;
     var liveStock = this.nearbyArray[index].liveStock;
     var website = this.nearbyArray[index].website;
     var aquatic = this.nearbyArray[index].aquatic;
     var crops = this.nearbyArray[index].crops;
     var image = this.nearbyArray[index].image; 
     console.log(name);
     let obj = {
     // name:this.nearbyArray[index ].name ,
     // description:this.nearbyArray[index].description,
     name: name,
     description: description,
     tel: tel,
     email: email,
     address: address,
     facebook: facebook,
     beeKeeping: beeKeeping,
     liveStock: liveStock,
     website: website,
     aquatic: aquatic,
     crops: crops,
     image: image
     }
     this.navCtrl.push(DescriptionPage, {description:obj})
     })
    
  }
    
 
 
})



}
 





search(){
 this.navCtrl.push(SearchPage)
}



}



