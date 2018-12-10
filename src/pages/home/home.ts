
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { FarmEatProvider } from '../../providers/farm-eat/farm-eat'
import { DescriptionPage } from '../description/description';
import { SearchPage } from '../search/search';
import searchArray from '../search/search'
import { AlertController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';


import { LoadingController } from 'ionic-angular';
import { THIS_EXPR } from '../../../node_modules/@angular/compiler/src/output/output_ast';

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
  nearbyArray = new Array();
  searchArea = this.navParams.get("searchArea");
  trackSearch = searchArray;
  nearbySeachFarmArray = [];
  @ViewChild(Slides) slides: Slides;
  icon;
  abmarker;
  slideArr: any = [];
  loca;
  distance;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  service = new google.maps.DistanceMatrixService();
  geocoder = new google.maps.Geocoder;
  destinationAddress;
  kiloMeter = "0";
  duration = "0";

   Searchlat  ;
   Searchlng ;

   searchQuery: string = '';
  items: string[];

  brocolli;
  watermelon ;
  pumpkin ;
  redPaper ;
  searchbar ;

      

  constructor(public navCtrl: NavController, public navParams: NavParams, private geo: Geolocation, private farmEatDb: FarmEatProvider, public alertCtrl: AlertController, private nativePageTransitions: NativePageTransitions, public loadingCtrl: LoadingController) {

  }


  ionViewDidEnter() {

    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration:7000
      
    });
    
    loader.present();

    

    // this.deleteMarkers()

    this.nearbyArray = [];

    
      this.farmEatDb.getCurrentLocation().then((radius: any) => {
        console.log(radius);

        this.farmEatDb.getallFarms().then((data: any) => {
          console.log(data);
          console.log(radius);


          this.farmEatDb.getNearByOrganizations(radius, data).then((data: any) => {
            console.log(data);
            if (this.nearbyArray.length == 0) {
              this.nearbyArray = data;
              console.log("no duplication");

            } else if (this.nearbyArray.length > 0) {
              console.log(' duplicate outttttt');

            }
            //this.nearbyArray = data;
            console.log(this.nearbyArray);



          })

        })

      })
   

      // this.farmEatDb.getSearchbyFarms(this.searchArea.lat, this.searchArea.lng).then((radius: any) => {
      //   console.log(radius);
      //   this.farmEatDb.getallFarms().then((data: any) => {
      //     console.log(data);

      //     this.farmEatDb.getSearchedFarm(this.searchArea.lat, this.searchArea.lng, radius, data).then((data: any) => {
      //       console.log(data);
      //       this.nearbyArray = data;
      //       console.log(this.nearbySeachFarmArray);
      //       if (this.nearbyArray.length == 0) {
      //         const alert = this.alertCtrl.create({
      //           title: 'Confirmation',
      //           subTitle: 'Currently we dont have Farms around your Area',
      //           buttons: ['OK']
      //         });
      //         alert.present();

      //       } else {


      //       }
      //     })
      //   })

      // })





    

    setTimeout(() => {
      const loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration:8000
        
      });
      this.loadMap();
    }, 8000)


    



  }


  loadMap() {
    //this.clearMarkers();

    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      
    });
    loader.present();
    this.geo.getCurrentPosition().then((position) => {

      

      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;

      this.loca = new google.maps.LatLng(this.lat, this.lon);

  
      const options = {
        center: { lat: this.lat, lng: this.lon },
        zoom: 10,
        disableDefaultUI: true,
        styles: 
        [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "landscape",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "landscape.man_made",
            "elementType": "labels.text",
            "stylers": [
              {
                "saturation": -5
              }
            ]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#73d22d"
              }
            ]
          },
          {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#73d22d"
              }
            ]
          },
          {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#73d22d"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.government",
            "stylers": [
              {
                "weight": 8
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#73d22d"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "poi.sports_complex",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#d19c2e"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dadada"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#c9c9c9"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          }
        ]
        
        //streetViewControl: false,
        //mapTypeId: 'satellite'
      }

      
      this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    

      
        let marker = new google.maps.Marker({
          map: this.map,
          zoom: 10,
         animation: google.maps.Animation.DROP,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          },
          position: this.map.getCenter()
        });


    

      for (let index = 0; index < this.nearbyArray.length; index++) {
   
        if (this.nearbyArray[index].aquatic == "true") {
          this.icon = '../../assets/imgs/fish-icon.png';
        
          

         
        } else if (this.nearbyArray[index].beeKeeping == "true") {
          this.icon = "../../assets/imgs/Bee-icon.png";
          

          this.brocolli="../../assets/imgs/icons8_Bee_96px.png";
          this.watermelon= "../../assets/imgs/icons8_Honey_96px.png"
        } else if (this.nearbyArray[index].crops == "true") {
          this.icon = "../../assets/imgs/tree-icon.png";

          this.brocolli ="../../assets/imgs/Broccoli_100px.png";
          this.watermelon = "../../assets/imgs/Watermelon_100px.png";
          this.pumpkin="../../assets/imgs/Pumpkin_100px.png" ;
          this.redPaper= "../../assets/imgs/Paprika_100px.png";


          console.log('incrop');
        }



       
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
        this.abmarker = new google.maps.Marker({
          map: this.map,
          icon: this.icon,

        
          position: { lat: parseFloat(this.nearbyArray[index].lat), lng: parseFloat(this.nearbyArray[index].lng) },
          label: name,
          zoom: 8,

        });

        this.slideArr.push(this.abmarker)
        console.log(this.slideArr);

        let destination = new google.maps.LatLng(this.nearbyArray[index].lat, this.nearbyArray[index].lng);

        this.abmarker.addListener('click', () => {


          console.log("clicked marker");

          //this.map = new google.maps.Map(this.mapRef.nativeElement, options);

          //calling method to display route from a to b
          this.calculateAndDisplayRoute(this.loca, destination, this.directionsDisplay, this.directionsService);
         // this.directionsDisplay.setMap(this.map);
        
        })

      }

      loader.dismiss()

    })
  }

  //getting an address coordinates
  geocodeLatLng(location) {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ 'location': location }, function (results, status) {
        if (status === 'OK') {
          console.log('OK');
          console.log(status);
          let locName = results[0].formatted_address;
          //let locStart = locName.split(",");
          this.destinationAddress = locName;
          console.log("Location Push:" + this.destinationAddress);
        } else {
          console.log(' not OK'+ status);
          
          window.alert('Geocoder failed due to: ' + status);
        } resolve(this.destinationAddress);
      }, (error) => {
        reject(error);
      });
    });
  }

 



  //calculating route
  calculateAndDisplayRoute(location, destination, directionsDisplay, directionsService) {

    console.log("loc" + location);

    console.log("des" + destination);

    directionsService.route({
      origin: location,
      destination: destination,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        console.log("routing OK");

        directionsDisplay.setOptions( { suppressMarkers: true } );
        
      } else {
        console.log(status);

        window.alert('Directions request failed due to ' + status);
      }
    });
  }


  
   //getting distance and calling the callback method
    getDistance(destination){

      this.geocodeLatLng(destination)
      this.service.getDistanceMatrix(
        {
          origins: [this.loca],
          destinations: [this.destinationAddress],
          travelMode: 'Driving'
        }, (response, status) => {
          if (status == 'OK') {
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;
        
            for (var i = 0; i < origins.length; i++) {
              var results = response.rows[i].elements;
              for (var j = 0; j < results.length; j++) {
                var element = results[j];
                this.distance = element.distance.text;
                console.log(this.distance);
              }
            }
          }
      });
      console.log("distance core : "+this.distance);
    
    }  

   
    

  slideChanged() {

   

    let currentIndex = this.slides.getActiveIndex();
    let currentLat = this.nearbyArray[currentIndex].lat
    let currentLon = this.nearbyArray[currentIndex].lng
  
    if (this.directionsDisplay != null) {
      this.directionsDisplay.setMap(null);
     
        console.log("directionDisplay has something");
        
    } else {
      console.log("directionDisplay has nothing");
    }
  

    this.directionsDisplay.setMap(this.map);
    let destination = new google.maps.LatLng(currentLat, currentLon);
    this.calculateAndDisplayRoute(this.loca, destination, this.directionsDisplay, this.directionsService)

    this.service.getDistanceMatrix(
      {
        origins: [this.loca],
        destinations: [destination],
        travelMode: 'DRIVING'
      }, (response, status)=>{
        
        if (status == 'OK') {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
          console.log(this.kiloMeter);
          console.log(  this.duration);
          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            console.log(this.kiloMeter);
          console.log(  this.duration);
            for (var j = 0; j < results.length; j++) {
              var element = results[j];
              this.kiloMeter = element.distance.text;
              this.duration = element.duration.text;
             console.log(this.kiloMeter);
             console.log(  this.duration);
             
             
              // console.log(distance);
              // console.log(duration);
            }
          }
        }
       });
      console.log( this.callback);
      
  

   document.getElementById("time").style.display="flex"
   document.getElementById("kilos").style.display="flex"

  }
  ionViewWillLeave() {

    
   
   }

   callback(response, status) {
    console.log(this.kiloMeter);
    console.log(  this.duration);
    if (status == 'OK') {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;
      console.log(this.kiloMeter);
      console.log(  this.duration);
      for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;
        console.log(this.kiloMeter);
      console.log(  this.duration);
        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          this.kiloMeter = element.distance.text;
          this.duration = element.duration.text;
         console.log(this.kiloMeter);
         console.log(  this.duration);
         
         
          // console.log(distance);
          // console.log(duration);
        }
      }
    }
   }

  moreinfo(i){


    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 1000,
       
     };
 
    this.nativePageTransitions.slide(options);
    var info = this.nearbyArray[i]
    this.navCtrl.push(DescriptionPage, {description: info} )
  }
 
  

serc (address){
  let Searchlat ;
  let Searchlng ;

  let geocoder = new google.maps.Geocoder();

  geocoder.geocode({'address': address}, (results, status)=>{

    if (status === 'OK') {
      //this.desLatLng = results[0].geometry.location;
    
      Searchlat = results[0].geometry.location.lat();
      Searchlng = results[0].geometry.location.lng();

  
     console.log( Searchlat);
     console.log( Searchlat);
}




this.map = new google.maps.Map(document.getElementById('map'), {
  zoom: 12,
  styles: 
  [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "landscape",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "labels.text",
      "stylers": [
        {
          "saturation": -5
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#73d22d"
        }
      ]
    },
    {
      "featureType": "landscape.natural.terrain",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#73d22d"
        }
      ]
    },
    {
      "featureType": "landscape.natural.terrain",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#73d22d"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.government",
      "stylers": [
        {
          "weight": 8
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#73d22d"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "poi.sports_complex",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#d19c2e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ] ,
  
  center: { lat:  parseFloat(Searchlat) , lng:parseFloat(Searchlng) },
  disableDefaultUI: true,
  
});

this.nearbyArray.length = 0 ;


let marker = new google.maps.Marker({
  map: this.map,
  zoom: 10,
 animation: google.maps.Animation.DROP,
  icon: {
    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
  },
  position: ({lat: parseFloat(Searchlat) , lng:parseFloat(Searchlng)})
});





this.farmEatDb.getSearchbyFarms(Searchlat,Searchlng).then((radius)=>{
  this.farmEatDb.getallFarms().then((data)=>{
    console.log(data);
    this.farmEatDb.getSearchedFarm(Searchlat,Searchlng,radius,data).then((data:any)=>{
      console.log(data);

      this.nearbyArray =data

      console.log(this.nearbyArray);

      if(this.nearbyArray.length == 0 ){

        const loader = this.loadingCtrl.create({
          content: "Please wait...",
          duration:2000
          
        });
        loader.present();
        
        setTimeout(()=>{
          const alert = this.alertCtrl.create({
            title: 'Notice',
            subTitle: "Currently we don't have farms around your area " ,
            buttons: ['OK']
          });
          alert.present();

        }, 2000)
        
        document.getElementById("hide").style.display="none"
        this.searchbar = null ;
       
      } else {

        document.getElementById("hide").style.display="none"
        this.searchbar = null ;
      
  
        const loader = this.loadingCtrl.create({
          content: "Please wait...",
          
        });
        loader.present();
  
        for (let index = 0; index < this.nearbyArray.length; index++) {
        
          if (this.nearbyArray[index].aquatic == "true") {
             this.icon = '../../assets/imgs/fish-icon.png';
          
         
             
   
             console.log(this.nearbyArray[index].aquatic);
           } else if (this.nearbyArray[index].beeKeeping == "true") {
             this.icon = "../../assets/imgs/Bee-icon.png";
         
           } else if (this.nearbyArray[index].crops == "true") {
             this.icon = "../../assets/imgs/tree-icon.png";
            
           }
   
          this.loca = new google.maps.LatLng(Searchlat, Searchlng);
          let destination =new google.maps.LatLng(this.nearbyArray[index].lat, this.nearbyArray[index].lng);
           this.calculateAndDisplayRoute(this.loca, destination, this.directionsDisplay, this.directionsService);
          var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
           this.abmarker = new google.maps.Marker({
             map: this.map,
             icon: this.icon,
           position: { lat: parseFloat(this.nearbyArray[index].lat), lng: parseFloat(this.nearbyArray[index].lng) },
             label: name,
             zoom: 10,
   
           });
  
       this.abmarker.addListener('click', () => {
  
  
          })
  
         loader.dismiss()
  
  
          }

        
      }
      

     
      
    })
    
  })
})

})

}

initializeItems() {
  this.items = [
    
      "Soweto diepkloof" ,
       "Soweto Maponya" ,
      "Soweto South gate Mall",
      "Midrand" ,
      "Braamfontein" ,
      "Durban",
      "Capetown" ,
      "Pretoria" ,
      "Krugerdorp" ,
      "Johannesburg",
      "Rustenburg",
      "Eastern Cape",
      "Kwazulu Natal"
      
      

      
     
   
      
      
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
    document.getElementById("hide").style.display="block"
  }
  
}


display(){

  //document.getElementById("hide").style.display="block"
  if(this.searchbar == ""){
    document.getElementById("hide").style.display="none" ;
   // document.getElementById("cardsHide").style.display="block"
    
  }else{
    document.getElementById("hide").style.display="block" ;

    //document.getElementById("cardsHide").style.display="none"

  }
  
}

}
