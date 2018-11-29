import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {FarmEatProvider} from '../../providers/farm-eat/farm-eat'

import { DescriptionPage } from '../description/description';
import { SearchPage } from '../search/search';
import searchArray from '../search/search'

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


  constructor(public navCtrl: NavController,  public navParams: NavParams, private geo: Geolocation, private farmEatDb:FarmEatProvider) {


    
  
    


   
    
  }



  ionViewDidEnter() {
  console.log(this.trackSearch);
  

    console.log(this.trackSearch);

    console.log(this.searchArea);




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
     
     
      console.log('innnfdaa');
      console.log(this.searchArea);
      

      console.log( this.searchArea.lat);
      console.log(this.searchArea.lng);
      
      this.farmEatDb.getSearchbyFarms(this.searchArea.lat,this.searchArea.lng).then((radius:any)=>{
        console.log(radius);

        this.farmEatDb.getallFarms().then((data:any)=>{
          console.log(data);

          

          this.farmEatDb.getSearchedFarm(this.searchArea.lat,this.searchArea.lng,radius ,data).then((data)=>{
            console.log(data);
            

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
        center: {lat: this.lat, lng:  this.lon},
        zoom: 10,
        streetViewControl: false,
        //mapTypeId: 'satellite'
      }

   
      this.map = new google.maps.Map(this.mapRef.nativeElement, options);
     console.log(this.nearbyArray);

     console.log("in");
     if(this.trackSearch.length == 0){

      console.log("innnnnnn");
      


     

      let marker = new google.maps.Marker({
        map: this.map,
        zoom: 8 ,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });

     console.log(marker.position);
     console.log(marker.postion);
     


    }else if(this.trackSearch.length ==1){

      console.log("second if statata");
      
console.log( this.searchArea);

       let a = this.searchArea.lat ;
      let b = this.searchArea.lng
      console.log(a);
      console.log(b);
      
      
      
      let marker = new google.maps.Marker({
        map: this.map,
        zoom: 8 ,
       // animation: google.maps.Animation.DROP,
        position: {lat: parseFloat(a),lng:parseFloat(b)}
      });


      console.log(marker.position.lat);
      console.log(marker.position.lng);
      
      



    }

    //  this.addMarker();  


   



    // let markerz = new google.maps.Marker({
    //   map: this.map,
    //   animation: google.maps.Animation.DROP,
    //   position: {lat:-25.6319488,lng:27.082176},
    // });


    
     

      for (let index = 0; index < this.nearbyArray.length; index++) {
        console.log(this.nearbyArray);
        
        console.log(this.nearbyArray[index].lat);
        console.log(this.nearbyArray[index].lng);
        console.log(this.nearbyArray[index].name);
        

     
      

      
      
        
       // console.log(lat +" "+lng);
       let abmarker = new google.maps.Marker({
         map: this.map,
         //icon:"../../assets/imgs/498229.svg" ,
        
        //animation: google.maps.Animation.DROP,
        position: {lat: parseFloat(this.nearbyArray[index].lat),lng:parseFloat(this.nearbyArray[index].lng)} ,
        label:name ,
        zoom:8
      });

    
        
      abmarker.addListener('click' , ()=>{
         alert(this.nearbyArray[index ].name)

        //  var lat = this.nearbyArray[index].lat
        //  var lon = this.nearbyArray[index].lng
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
          //  name:this.nearbyArray[index ].name ,
          //  description:this.nearbyArray[index].description,
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

//   addMarker(){



//     // let abmarker = new google.maps.Marker({
//     //   map: this.map,
      
//     //   //animation: google.maps.Animation.DROP,
//     //   position: {lat:-25.6319488,lng:28.082176},
//     //   label:"new one"
//     // });
    
    
//     //-25.6319488
// // 28.082176

    


//     // marker.addListener('click' , function(){
//     //   alert("clicked")
//     // })
   
// }


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

search(){
  this.navCtrl.push(SearchPage)
}

}
