
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams,MenuController } from 'ionic-angular';
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
<<<<<<< HEAD
  kiloMeter ;
  duration ;
=======
<<<<<<< HEAD
  decide = 0;
  arrow = "arrow-down";
  arrowDir = "arrow-down"
  
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, private geo: Geolocation, private farmEatDb: FarmEatProvider, public alertCtrl: AlertController, private nativePageTransitions: NativePageTransitions, public loadingCtrl: LoadingController) {
=======

>>>>>>> 78027f5f9fc3e559bc26927f96810f1379ebb759

   Searchlat  ;
   Searchlng ;

   searchQuery: string = '';
  items: string[];

  brocolli;
  watermelon ;
  pumpkin ;
  redPaper ;
  searchbar ;

<<<<<<< HEAD
  marker ;
=======
  constructor(public navCtrl: NavController, public navParams: NavParams, private geo: Geolocation, private farmEatDb: FarmEatProvider, public alertCtrl: AlertController, private nativePageTransitions: NativePageTransitions, public loadingCtrl: LoadingController) {
>>>>>>> 111f4126eb96c04a8a07919316557cd3c7c4d8a1
>>>>>>> 78027f5f9fc3e559bc26927f96810f1379ebb759

  

  constructor(public navCtrl: NavController, public navParams: NavParams, private geo: Geolocation, private farmEatDb: FarmEatProvider, public alertCtrl: AlertController, private nativePageTransitions: NativePageTransitions, public loadingCtrl: LoadingController,public menuCtrl: MenuController,private keyboard: Keyboard) {
    this.menuCtrl.enable(true, 'myMenu');
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
   
<<<<<<< HEAD
=======

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

>>>>>>> 78027f5f9fc3e559bc26927f96810f1379ebb759






    

    setTimeout(() => {
      const loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration:8000
        
      });
      this.loadMap();
    }, 8000)


    

  
  
  
  }


  ionViewDidEnter() {

  


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
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "labels.text",
            "stylers": [
              {
                "color": "#93b039"
              }
            ]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#93b039"
              }
            ]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#93b039"
              }
            ]
          },
          {
            "featureType": "landscape.natural.landcover",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#93b039"
              }
            ]
          },
          {
            "featureType": "landscape.natural.landcover",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#93b039"
              }
            ]
          },
          {
            "featureType": "landscape.natural.landcover",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#93b039"
              }
            ]
          },
          {
            "featureType": "landscape.natural.landcover",
            "elementType": "labels.text",
            "stylers": [
              {
                "color": "#93b039"
              }
            ]
          },
          {
            "featureType": "landscape.natural.landcover",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#93b039"
              }
            ]
          },
          {
            "featureType": "landscape.natural.landcover",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#93b039"
              }
            ]
          },
          {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#93b039"
              }
            ]
          },
          {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#93b039"
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
            "featureType": "poi.attraction",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#93b039"
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
                "color": "#93b039"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#93b039"
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
                "color": "#93b039"
              }
            ]
          },
          {
            "featureType": "poi.sports_complex",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#93b039"
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
                "color": "#d1e2d1"
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
                "color": "#99e4fd"
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

    

      
        this. marker = new google.maps.Marker({
          map: this.map,
          zoom: 10,
         animation: google.maps.Animation.DROP,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          },
          
          position: this.map.getCenter()
        });
<<<<<<< HEAD
      
=======


    
>>>>>>> 78027f5f9fc3e559bc26927f96810f1379ebb759

    

      for (let index = 0; index < this.nearbyArray.length; index++) {
   
        if (this.nearbyArray[index].aquatic == "true") {
          this.icon = "../../assets/icon/icons-fish.pin.png";
        
          

         
        } else if (this.nearbyArray[index].beeKeeping == "true") {
          this.icon = "../../assets/icon/icons-bee.pin.png";
          

          this.brocolli="../../assets/imgs/icons8_Bee_96px.png";
          this.watermelon= "../../assets/imgs/icons8_Honey_96px.png"
        } else if (this.nearbyArray[index].crops == "true") {
          this.icon = "../../assets/icon/icons-tree.pin.png";

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

<<<<<<< HEAD
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
=======
<<<<<<< HEAD

    //   setTimeout(() => {

    //     this.slideArr[currentIndex].setAnimation(null);

    //   }, 2000)

    // }

    // let marker = new google.maps.Marker({
    //  // map: this.map,
    //  //icon: iconBase + 'farm_maps.png',
>>>>>>> 78027f5f9fc3e559bc26927f96810f1379ebb759

     
      
  

<<<<<<< HEAD
   document.getElementById("hidetime").style.display="flex"
   document.getElementById("hidekilos").style.display="flex"
=======
    //   position:  this.map.setCenter({lat: parseFloat( currentLat),lng:parseFloat( currentLon)}),
    //   animation: this.slideArr[currentIndex].setAnimation(google.maps.Animation.BOUNCE),
    //   label:name ,
    //   zoom:20 ,
    // })
=======
    this.service.getDistanceMatrix(
      {
        origins: [this.loca],
        destinations: [destination],
        travelMode: 'DRIVING'
      }, this.callback);
  
>>>>>>> 111f4126eb96c04a8a07919316557cd3c7c4d8a1
>>>>>>> 78027f5f9fc3e559bc26927f96810f1379ebb759

   document.getElementById("time").style.display="flex"
   document.getElementById("kilos").style.display="flex"
  
  

  }
  ionViewWillLeave() {

<<<<<<< HEAD
    
   
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
=======
    // let options: NativeTransitionOptions = {
    //    direction: 'up',
    //    duration: 500,
    //    slowdownfactor: 3,
    //    slidePixels: 20,
    //    iosdelay: 100,
    //    androiddelay: 150,
    //    fixedPixelsTop: 0,
    //    fixedPixelsBottom: 60
    //   };
   
    // this.nativePageTransitions.slide(options)
      
   
>>>>>>> 78027f5f9fc3e559bc26927f96810f1379ebb759
   }

  moreinfo(i){


    let options: NativeTransitionOptions = {
      direction: 'up',
<<<<<<< HEAD
      duration: 1000,
       
=======
      duration: 600,
         slowdownfactor: 3,
         slidePixels: 20,
         iosdelay: 100,
         androiddelay: 250,
         fixedPixelsTop: 0,
         fixedPixelsBottom: 60
>>>>>>> 78027f5f9fc3e559bc26927f96810f1379ebb759
     };
 
    this.nativePageTransitions.fade(options);
    var info = this.nearbyArray[i]
    this.navCtrl.push(DescriptionPage, {description: info} )
  }
 
<<<<<<< HEAD
=======
<<<<<<< HEAD
  search() {
    this.navCtrl.push(SearchPage)
=======
>>>>>>> 78027f5f9fc3e559bc26927f96810f1379ebb759
  

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
<<<<<<< HEAD
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
      "featureType": "landscape.natural",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "labels.text",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "elementType": "labels.text",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.terrain",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.terrain",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#93b039"
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
      "featureType": "poi.attraction",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#93b039"
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
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#93b039"
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
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "poi.sports_complex",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#93b039"
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
          "color": "#d1e2d1"
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
          "color": "#99e4fd"
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
  ],
  
=======
>>>>>>> 78027f5f9fc3e559bc26927f96810f1379ebb759
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
<<<<<<< HEAD
=======

      if(this.nearbyArray.length == 0 ){

        const alert = this.alertCtrl.create({
          title: 'New Friend!',
          subTitle: 'Your friend, Obi wan Kenobi, just ac',
          buttons: ['OK']
        });
        alert.present();
      }
      
>>>>>>> 78027f5f9fc3e559bc26927f96810f1379ebb759

      if(this.nearbyArray.length == 0 ){

<<<<<<< HEAD
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
=======

      for (let index = 0; index < this.nearbyArray.length; index++) {
      
        if (this.nearbyArray[index].aquatic == "true") {
           this.icon = '../../assets/imgs/fish-icon.png';
        
       
           
 
           console.log(this.nearbyArray[index].aquatic);
         } else if (this.nearbyArray[index].beeKeeping == "true") {
           this.icon = "../../assets/imgs/Bee-icon.png";
       
         } else if (this.nearbyArray[index].crops == "true") {
           this.icon = "../../assets/imgs/tree-icon.png";
          
         }
 
         console.log( parseFloat(this.nearbyArray[index].lat));
         console.log( parseFloat(this.nearbyArray[index].lng));
          
         
         this.loca = new google.maps.LatLng(Searchlat, Searchlng);
         console.log(this.loca);

       
         
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


          console.log("clicked marker");
>>>>>>> 78027f5f9fc3e559bc26927f96810f1379ebb759

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
             this.icon = "../../assets/icon/icons-fish.pin.png";
          
         
             
   
             console.log(this.nearbyArray[index].aquatic);
           } else if (this.nearbyArray[index].beeKeeping == "true") {
             this.icon = "../../assets/icon/icons-bee.pin.png";
         
           } else if (this.nearbyArray[index].crops == "true") {
             this.icon = "../../assets/icon/icons-tree.pin.png";
            
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
<<<<<<< HEAD
      "Johannesburg",
      "Rustenburg",
      "Eastern Cape",
      "Kwazulu Natal",
      "Vaal",
      "Vereeniging",
      "Mpumalanga",
=======
>>>>>>> 78027f5f9fc3e559bc26927f96810f1379ebb759
      
      

      
     
   
      
      
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
>>>>>>> 111f4126eb96c04a8a07919316557cd3c7c4d8a1
  }
  
}
<<<<<<< HEAD


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
=======
>>>>>>> 78027f5f9fc3e559bc26927f96810f1379ebb759
