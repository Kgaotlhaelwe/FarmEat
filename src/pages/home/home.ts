
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


   Searchlat  ;
   Searchlng ;

   searchQuery: string = '';
  items: string[];

      

  constructor(public navCtrl: NavController, public navParams: NavParams, private geo: Geolocation, private farmEatDb: FarmEatProvider, public alertCtrl: AlertController, private nativePageTransitions: NativePageTransitions, public loadingCtrl: LoadingController) {

  }


  ionViewDidEnter() {

    const loader = this.loadingCtrl.create({
      content: "Loading map, Please wait...",
      duration:7000
      
    });
    
    loader.present();

    

  
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
           
            console.log(this.nearbyArray);



          })

        })

      })

      

      this.farmEatDb.getSearchbyFarms(26.2583 , 27.9014).then((v)=>{
        console.log(v);
       
     })
   

     



    

    setTimeout(() => {
      const loader = this.loadingCtrl.create({
        content: "Loading map, Please wait...",
        duration:8000
        
      });
      this.loadMap();
    }, 8000)


    



  }


  loadMap() {
    //this.clearMarkers();
    

    const loader = this.loadingCtrl.create({
      content: "Loading map, Please wait...",
      
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


      //  else if (this.trackSearch.length == 1) {
       

      //   let a = this.searchArea.lat;
      //   let b = this.searchArea.lng




      //   let marker = new google.maps.Marker({
      //     map: this.map,
      //     zoom: 8,
      //     // animation: google.maps.Animation.DROP,
      //     position: this.map.setCenter({ lat: parseFloat(a), lng: parseFloat(b) })
      //   });

      // }

      

      for (let index = 0; index < this.nearbyArray.length; index++) {
      
        console.log('out');
        console.log("in the loop");
        
        console.log(this.nearbyArray[index].aquatic);
        console.log(this.nearbyArray[index].beeKeeping);
        console.log(this.nearbyArray[index].crops);
        if (this.nearbyArray[index].aquatic == "true") {
          this.icon = '../../assets/imgs/fish-icon.png';
          console.log('inaqautic');

          console.log('inif statement');
          

          console.log(this.nearbyArray[index].aquatic);
        } else if (this.nearbyArray[index].beeKeeping == "true") {
          this.icon = "../../assets/imgs/Bee-icon.png";
          console.log('inbeekeeping');
        } else if (this.nearbyArray[index].crops == "true") {
          this.icon = "../../assets/imgs/tree-icon.png";
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

    //declaring google map services
    // var directionsService = new google.maps.DirectionsService;
    // var directionsDisplay = new google.maps.DirectionsRenderer;

    let currentIndex = this.slides.getActiveIndex();
    let currentLat = this.nearbyArray[currentIndex].lat
    let currentLon = this.nearbyArray[currentIndex].lng
  //  console.log(this.slideArr[currentIndex].getAnimation());


    // if (this.slideArr[currentIndex].getAnimation() != null) {
    //   console.log("has Anime");
    //   this.slideArr[currentIndex].setAnimation(null);
    // } else {
    if (this.directionsDisplay != null) {
      this.directionsDisplay.setMap(null);
      // directionsDisplay = null;
        console.log("directionDisplay has something");
        
    } else {
      console.log("directionDisplay has nothing");
    }
    // let marker = new google.maps.Marker({
    //   // map: this.map,
    //   //icon: iconBase + 'farm_maps.png',


    //   position: this.map.setCenter({ lat: parseFloat(currentLat), lng: parseFloat(currentLon) }),
    //   //animation: this.slideArr[currentIndex].setAnimation(google.maps.Animation.BOUNCE),
    //   label: name,
    //   zoom: 20,
    // })

    this.directionsDisplay.setMap(this.map);
    let destination = new google.maps.LatLng(currentLat, currentLon);
    this.calculateAndDisplayRoute(this.loca, destination, this.directionsDisplay, this.directionsService)


    //   setTimeout(() => {

    //     this.slideArr[currentIndex].setAnimation(null);

    //   }, 2000)

    // }

    // let marker = new google.maps.Marker({
    //  // map: this.map,
    //  //icon: iconBase + 'farm_maps.png',


    //   position:  this.map.setCenter({lat: parseFloat( currentLat),lng:parseFloat( currentLon)}),
    //   animation: this.slideArr[currentIndex].setAnimation(google.maps.Animation.BOUNCE),
    //   label:name ,
    //   zoom:20 ,
    // })

    console.log(currentLat);

  }
  ionViewWillLeave() {

   
   
   }

  moreinfo(i){
console.log(i);

var info = this.nearbyArray[i]
console.log(info);

   
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 600,
         slowdownfactor: 3,
         slidePixels: 20,
         iosdelay: 100,
         androiddelay: 250,
         fixedPixelsTop: 0,
         fixedPixelsBottom: 60
     };
 
    this.nativePageTransitions.fade(options);

    this.navCtrl.push(DescriptionPage, {description: info} )
  }

 
  search(address) {

    let a ;
    let b ;
    let map ;
    
    let loca  ;
    const geocoder = new google.maps.Geocoder;
   
    geocoder.geocode({'address': address}, function(results, status) {

    console.log(address);
    
        if (status === 'OK') {
          this.desLatLng = results[0].geometry.location;
        
         this.Searchlat = results[0].geometry.location.lat();
         this.Searchlng = results[0].geometry.location.lng();

          a = results[0].geometry.location.lat();
          b =results[0].geometry.location.lng()
         console.log( this.Searchlat);
         console.log( this.Searchlat);


     map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: { lat:  this.Searchlat , lng:this.Searchlng },
          disableDefaultUI: true,
          //styles: this.media.mapstyle
        });

        var input = document.getElementById('pac-input');
      




         let marker = new google.maps.Marker({
          map: map,
          zoom: 10,
         animation: google.maps.Animation.DROP,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          },
          position: ({lat: this.Searchlat,lng:this.Searchlng})
        });

        document.getElementById("hide").style.display="none";
    

  } else {
           alert('Geocode was not successful for the following reason: ' + status);
         }
         

  })

setTimeout(()=>{

  this.farmEatDb.getSearchbyFarm(a, b).then((radius)=>{
    console.log(radius);
    this.farmEatDb.getallFarms().then((data)=>{
      this.farmEatDb. getSearchedFarm(a, b,radius,data).then((searchedFarm:any)=>{
        console.log(searchedFarm);
        this.nearbyArray=searchedFarm;
        console.log( this.nearbyArray);


        for (let index = 0; index < this.nearbyArray.length; index++) {
      
         if (this.nearbyArray[index].aquatic == "true") {
            this.icon = '../../assets/imgs/fish-icon.png';
            console.log('inaqautic');
  
            console.log('inif statement');
            
  
            console.log(this.nearbyArray[index].aquatic);
          } else if (this.nearbyArray[index].beeKeeping == "true") {
            this.icon = "../../assets/imgs/Bee-icon.png";
            console.log('inbeekeeping');
          } else if (this.nearbyArray[index].crops == "true") {
            this.icon = "../../assets/imgs/tree-icon.png";
            console.log('incrop');
          }
  
          console.log( parseFloat(this.nearbyArray[index].lat));
          console.log( parseFloat(this.nearbyArray[index].lng));
          
          
  
         
          var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
          this.abmarker = new google.maps.Marker({
            map: map,
            icon: this.icon,
  
          
            position: { lat: parseFloat(this.nearbyArray[index].lat), lng: parseFloat(this.nearbyArray[index].lng) },
            label: name,
            zoom: 10,
  
          });
  
          this.slideArr.push(this.abmarker)
          console.log(this.slideArr);
  
          let destination = new google.maps.LatLng(this.nearbyArray[index].lat, this.nearbyArray[index].lng);
  
          this.abmarker.addListener('click', () => {
  
  
            console.log("clicked marker");
  
            //this.map = new google.maps.Map(this.mapRef.nativeElement, options);


            console.log(this.loca)

            setTimeout(()=>{
              this.loca =new google.maps.LatLng(a, b);
              console.log(this.loca);

            }, 6000)
            
         
            
  
  
            //calling method to display route from a to b
            this.calculateAndDisplayRoute(this.loca, destination, this.directionsDisplay, this.directionsService);
           // this.directionsDisplay.setMap(this.map);
          
          })
  
        }
        
      })
    })
    
  })
}, 1200)
  

  
  
  
}



nextpage(){
  this.navCtrl.push(SearchPage);
}

initializeItems() {
  this.items = [
    
      "Soweto diepkloof" , "Soweto Maponya" ,
      "Soweto South gate Mall",
      "Midrand" ,
      "Braamfontein" ,
      "Durban",
      "Capetown"
      

      
     
   
      
      
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

}
