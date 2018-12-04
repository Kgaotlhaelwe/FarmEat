
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {FarmEatProvider} from '../../providers/farm-eat/farm-eat'
import { DescriptionPage } from '../description/description';
import { SearchPage } from '../search/search';
import searchArray from '../search/search'
import { AlertController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import { LoadingController } from 'ionic-angular';

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
 @ViewChild(Slides) slides: Slides;
 icon ;
 abmarker;
 slideArr:any = []
 constructor(public navCtrl: NavController, public navParams: NavParams, private geo: Geolocation, private farmEatDb:FarmEatProvider,public alertCtrl: AlertController,private keyboard: Keyboard, public loadingCtrl: LoadingController) {
  
 }
 
 
 ionViewDidEnter() {

 this.map = null ;
 
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
      this.nearbyArray=data ;
      console.log(this.nearbySeachFarmArray);
      if(this.nearbyArray.length == 0){
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
   }, 2000)
  
  
  
 
 
 
 }
 loadMap(){


  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });


 
 this.geo.getCurrentPosition().then((position) => {
  console.log(position)
  this.lat = position.coords.latitude;
  this.lon = position.coords.longitude; 
  //map options
  const options = {
  center: {lat: this.lat, lng: this.lon},
  zoom: 10,
  
  //streetViewControl: false,
  //mapTypeId: 'satellite'
  }
 
  this.map = new google.maps.Map(this.mapRef.nativeElement, options);
 
  if(this.trackSearch.length == 0){
 
  
 // var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
  let marker = new google.maps.Marker({
  map: this.map,
  zoom: 10,
  //icon: iconBase + 'info-i_maps.png',
  //animation: google.maps.Animation.DROP,
  
  
  animation: google.maps.Animation.DROP,
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
  position: this.map.setCenter({lat: parseFloat(a),lng:parseFloat(b)})
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
   
  })

  loading.dismiss();
 
 } 
  
  
  
 }
 
 
  
  for (let index = 0; index < this.nearbyArray.length; index++) {
   
  if(this.nearbyArray[index].aquatic == "true"){
   this.icon = '../../assets/imgs/icons8_Prawn_96px_2.png' ;
   console.log('inaqautic');
   
   console.log(this.nearbyArray[index].aquatic);
  }else if(this.nearbyArray[index].beeKeeping == "true"){
   this.icon="../../assets/imgs/icons8_Bee_100px.png";
   console.log('inbeekeeping');
  }else if (this.nearbyArray[index].crops == "true"){
   this.icon ="../../assets/imgs/icons8_Compost_Heap_96px_1.png" ;
   console.log('incrop');
  }
  
 // console.log(lat +" "+lng);
  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
  this.abmarker = new google.maps.Marker({
   map: this.map,
  //icon: iconBase,
  
  //animation: google.maps.Animation.DROP,
  position: {lat: parseFloat(this.nearbyArray[index].lat),lng:parseFloat(this.nearbyArray[index].lng)},
  label:name ,
  zoom:8,
 
  });
​
  this.slideArr.push(this.abmarker)
  console.log(this.slideArr);
  
  
  this.abmarker.addListener('click' , ()=>{
  
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
​
 
slideChanged(){
 let currentIndex = this.slides.getActiveIndex();
 let currentLat = this.nearbyArray[currentIndex].lat
 let currentLon = this.nearbyArray[currentIndex].lng
 console.log(this.slideArr[currentIndex].getAnimation());
 
​
 if (this.slideArr[currentIndex].getAnimation() != null) {
  console.log("has Anime");
  this.slideArr[currentIndex].setAnimation(null);
 } else {
​
  let marker = new google.maps.Marker({
   // map: this.map,
   //icon: iconBase + 'farm_maps.png',
    
   
    position: this.map.setCenter({lat: parseFloat( currentLat),lng:parseFloat( currentLon)}),
    animation: this.slideArr[currentIndex].setAnimation(google.maps.Animation.BOUNCE),
    label:name ,
    zoom:20 ,
   })
  setTimeout(()=>{
   
    this.slideArr[currentIndex].setAnimation(null);
   
  }, 2000)
  
 }
 
 // let marker = new google.maps.Marker({
 // // map: this.map,
 // //icon: iconBase + 'farm_maps.png',
  
  
 //  position: this.map.setCenter({lat: parseFloat( currentLat),lng:parseFloat( currentLon)}),
 //  animation: this.slideArr[currentIndex].setAnimation(google.maps.Animation.BOUNCE),
 //  label:name ,
 //  zoom:20 ,
 // })
 
 console.log(currentLat);
 
}
search(){
 this.navCtrl.push(SearchPage)
 this.keyboard.show();
}


moreinfo(name , image , type ,email , description, tel ,address , facebook ,beeKeeping,liveStock, website , crop, aquatic){

  let obj = {
    name:name ,
    image:image ,
    type:type ,
    email:email ,
    description:description ,
    tel:tel  ,
    address :address ,
    facebook:facebook ,
    beeKeeping:beeKeeping ,
    liveStock:liveStock ,
    website:website ,
    crop:crop ,
    aquatic:aquatic

  }

  this.navCtrl.push(DescriptionPage, { description:obj})

}
}
