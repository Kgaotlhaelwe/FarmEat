
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, MenuController, Keyboard } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { FarmEatProvider } from '../../providers/farm-eat/farm-eat'
import { DescriptionPage } from '../description/description';
import { SearchPage } from '../search/search';
import searchArray from '../search/search'
import { AlertController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
// import { Keyboard } from '@ionic-native/keyboard';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import indexArr from '../../app/app.component'
import { LoadingController } from 'ionic-angular';
import { duration } from 'moment';

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
  indArr = indexArr
  nearbyArray = new Array();
  searchArea = this.navParams.get("searchArea");
  trackSearch = searchArray;
  nearbySeachFarmArray = [];
  @ViewChild(Slides) slides: Slides;
  icon;
  abmarker;
  slideArr: any = [];
  contentString = []
  loca;
  distance;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  service = new google.maps.DistanceMatrixService();
  geocoder = new google.maps.Geocoder;
  destinationAddress;
  kiloMeter;
  duration;

  Searchlat;
  Searchlng;

  searchQuery: string = '';
  items: string[];

  brocolli;
  watermelon;
  pumpkin;
  redPaper;
  searchbar;
  trackMap = 0;

  loader

  marker;
  farmsOnSlide = [];
  connect = 1;
  geoErr = "No Geo";

  mapStyle = [
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

  provinces = [
    "Eastern Cape",
    "Free State",
    "Gauteng",
    "KwaZulu-Natal",
    "Limpopo",
    "Mpumalanga",
    "North West",
    "Northern Cape",
    "Western Cape"
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, private geo: Geolocation, private farmEatDb: FarmEatProvider, public alertCtrl: AlertController, private nativePageTransitions: NativePageTransitions, public loadingCtrl: LoadingController, public menuCtrl: MenuController, private keyboard: Keyboard) {
    this.menuCtrl.enable(true, 'myMenu');

    console.log("Array");
    console.log(this.indArr);
    var views = navCtrl.getViews()
    console.log(views);


  }

  async ionViewDidLoad() {
    await this.geo.getCurrentPosition().then((position) => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      console.log(this.lat);
      console.log(this.lon);

      this.geoErr = "Got Location"
      //alert(this.lat)
    }).catch((error) => {

      console.log(error.message);
      this.geoErr = error.message
      this.lat = -26.2041;
      this.lon = 28.0473;



    })

    //this.checkPermission()

    this.loader = this.loadingCtrl.create({
      content: "Please wait... Your map is still loading",
    });

    this.loader.present();




    // this.deleteMarkers()

    this.nearbyArray = [];
    var allFarmss = []


    this.farmEatDb.getCurrentLocation(this.lat, this.lon).then((radius: any) => {
      console.log(radius);

      this.farmEatDb.getallFarms().then((data: any) => {
        console.log(data);
        console.log(radius);
        allFarmss = data
        console.log(allFarmss);


        this.farmEatDb.getNearByOrganizations(radius, data).then((data: any) => {
          console.log(data);
          if (this.nearbyArray.length == 0) {
            this.nearbyArray = data;
            this.farmsOnSlide = data;
            console.log("Checking MArkers Arrays");
            console.log(this.farmsOnSlide);
            console.log(this.nearbyArray);

            console.log("no duplication");
            //  alert("no nearby")
          } else if (this.nearbyArray.length > 0) {
            console.log(' duplicate outttttt');

          }
          this.nearbyArray = data;
          console.log(this.nearbyArray);

          if (this.nearbyArray.length == 0) {
            setTimeout(() => {
              const alert = this.alertCtrl.create({
                title: 'Notice',
                subTitle: "Currently we don't have farms around your area, so we will locate you to an area that does",
                cssClass: "myAlert",
                buttons: [{
                  text: 'OK',
                  handler: data => {
                    console.log('OK clicked');
                    var defualtLat = -26.26213302840454
                    var defualtLng = 27.950475030301852

                    this.farmEatDb.getCurrentLocation(defualtLat, defualtLng).then((radius: any) => {
                      this.farmEatDb.getNearByOrganizations(radius, allFarmss).then((data: any) => {
                        if (this.nearbyArray.length == 0) {
                          this.nearbyArray = data;
                          this.farmsOnSlide = data;
                          console.log(this.farmsOnSlide);

                          console.log("no duplication");
                          //  alert("no nearby")
                        } else if (this.nearbyArray.length > 0) {
                          console.log(' duplicate outttttt');

                        }
                      })
                    })
                  }
                }]
              });
              alert.present();

            }, 2000)
          }


          console.log(this.nearbyArray);



        })

      })

    })










    setTimeout(() => {
      this.loadMap();
    }, 10000);



    var views = this.navCtrl.getViews()
    console.log(views);
  }





  async getUserLoc() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait... Your map is still loading",
    });

    this.loader.present();
    await this.farmEatDb.getCurrentLocations().then((data: any) => {
      console.log(data);
      this.lat = data.coords.latitude;
      this.lon = data.coords.longitude;
      console.log(this.lat);
      console.log(this.lon);
      this.geoErr = "Got Location"
    })

    this.nearbyArray = [];
    var allFarmss = []


    await this.farmEatDb.getCurrentLocation(this.lat, this.lon).then((radius: any) => {
      console.log(radius);

      this.farmEatDb.getallFarms().then((data: any) => {
        console.log(data);
        console.log(radius);
        allFarmss = data



        this.farmEatDb.getNearByOrganizations(radius, data).then((data: any) => {
          console.log(data);
          if (this.nearbyArray.length == 0) {

            console.log("Got slidesssssssssssssssssssssssssssssssssss");

            this.nearbyArray = data;
            this.farmsOnSlide = data;
            console.log(this.farmsOnSlide.length);
            console.log(this.nearbyArray.length);


            console.log("no duplication");
            //  alert("no nearby")
          } else if (this.nearbyArray.length > 0) {
            console.log(' duplicate outttttt');

          }
          this.nearbyArray = data;
          console.log(this.nearbyArray);

          if (this.nearbyArray.length == 0) {
            setTimeout(() => {
              const alert = this.alertCtrl.create({
                title: 'Notice',
                subTitle: "Currently we don't have farms around your area, so we will locate you to an area that does",
                cssClass: "myAlert",
                buttons: [{
                  text: 'OK',
                  handler: data => {
                    console.log('OK clicked');
                    var defualtLat = -26.26213302840454
                    var defualtLng = 27.950475030301852

                    this.farmEatDb.getCurrentLocation(defualtLat, defualtLng).then((radius: any) => {
                      this.farmEatDb.getNearByOrganizations(radius, allFarmss).then((data: any) => {
                        if (this.nearbyArray.length == 0) {
                          this.nearbyArray = data;
                          this.farmsOnSlide = data;
                          console.log(this.farmsOnSlide.length);

                          console.log("no duplication");
                          //  alert("no nearby")
                        } else if (this.nearbyArray.length > 0) {
                          console.log(' duplicate outttttt');

                        }
                      })
                    })
                  }
                }]
              });
              alert.present();

            }, 2000)
          }


          console.log(this.nearbyArray);



        })

      })

    })




    this.loadMap()
    // loader.dismiss()
  }


  async loadMap() {
    console.log("LoadMap");

    console.log(this.geoErr);


    if (await this.geoErr == "Got Location") {
      console.log("Allowed Location");


      this.connect = 0;
      this.loca = new google.maps.LatLng(this.lat, this.lon);
      console.log(this.loca);
      console.log("location above");


      const options = {
        center: { lat: this.lat, lng: this.lon },
        zoom: 8,
        disableDefaultUI: true,
        styles: this.mapStyle
      }

      this.map = new google.maps.Map(this.mapRef.nativeElement, options);

      this.marker = new google.maps.Marker({
        map: this.map,
        zoom: 10,
        animation: google.maps.Animation.DROP,
        icon: {
          url: "../../assets/icon/manicon.png"
        },

        position: this.map.getCenter()
      });

      console.log("outside for loop");
      console.log(this.farmsOnSlide.length);



      for (let index = 0; index < this.farmsOnSlide.length; index++) {
        console.log("inside for loop");

        if (this.farmsOnSlide[index].crops == true) {
          if (this.farmsOnSlide[index].aquatic == true) {
            this.icon = "../../assets/icon/icons-fish.pin.png";
            console.log(this.farmsOnSlide[index].aquatic);
          } else if (this.farmsOnSlide[index].beeKeeping == true) {
            this.icon = "../../assets/icon/icons-bee.pin.png";
          } else if (this.farmsOnSlide[index].liveStock == true) {
            this.icon = "../../assets/icon/icons-cow.pin.png";
          } else {
            this.icon = "../../assets/icon/icons-tree.pin.png";
          }
        } else if (this.farmsOnSlide[index].aquatic == true) {
          this.icon = "../../assets/icon/icons-fish.pin.png";
          console.log(this.farmsOnSlide[index].aquatic);
        } else if (this.farmsOnSlide[index].beeKeeping == true) {
          this.icon = "../../assets/icon/icons-bee.pin.png";
        } else if (this.farmsOnSlide[index].liveStock == true) {
          this.icon = "../../assets/icon/icons-cow.pin.png";
        }




        console.log("Farm Pins");
        var contentString = '<div id="infoWindow">' +
        this.farmsOnSlide[index].name
      
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
        this.abmarker = new google.maps.Marker({
          map: this.map,
          icon: this.icon,


          position: { lat: parseFloat(this.farmsOnSlide[index].lat), lng: parseFloat(this.farmsOnSlide[index].lng) },
          label: name,
          zoom: 10,

        });
        console.log("Farm Pins End");


        console.log(this.abmarker);
        this.slideArr.push(this.abmarker)
        console.log(this.slideArr);

        let destination = new google.maps.LatLng(this.farmsOnSlide[index].lat, this.farmsOnSlide[index].lng);

        this.attachSecretMessage(this.abmarker,this.farmsOnSlide[index].name);

      }




    } else if (this.geoErr == "Illegal Access") {
      console.log("Dinied Location");

      console.log("show all");

      this.connect = 1

      const showallfarms = {
        center: { lat: this.lat, lng: this.lon },
        zoom: 12,
        disableDefaultUI: true,
        styles: this.mapStyle
      }


      this.map = new google.maps.Map(this.mapRef.nativeElement, showallfarms);



      var allFarms = [];
      await this.farmEatDb.getallFarms().then((data: any) => {
        this.farmsOnSlide = data;
        console.log(this.farmsOnSlide);

        console.log("Farm Arrays");
        console.log(this.farmsOnSlide);
      })



      for (let index = 0; index < this.farmsOnSlide.length; index++) {
        console.log("inside forloop");
        if (this.farmsOnSlide[index].crops == true) {
          if (this.farmsOnSlide[index].aquatic == true) {
            this.icon = "../../assets/icon/icons-fish.pin.png";
            console.log(this.farmsOnSlide[index].aquatic);
          } else if (this.farmsOnSlide[index].beeKeeping == true) {
            this.icon = "../../assets/icon/icons-bee.pin.png";
          } else if (this.farmsOnSlide[index].liveStock == true) {
            this.icon = "../../assets/icon/icons-cow.pin.png";
          } else {
            this.icon = "../../assets/icon/icons-tree.pin.png";
          }
        } else if (this.farmsOnSlide[index].aquatic == true) {
          this.icon = "../../assets/icon/icons-fish.pin.png";
          console.log(this.farmsOnSlide[index].aquatic);
        } else if (this.farmsOnSlide[index].beeKeeping == true) {
          this.icon = "../../assets/icon/icons-bee.pin.png";
        } else if (this.farmsOnSlide[index].liveStock == true) {
          this.icon = "../../assets/icon/icons-cow.pin.png";
        }


        
        var infowindow = new google.maps.InfoWindow();

        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
        this.abmarker = new google.maps.Marker({
          map: this.map,
          icon: this.icon,


          position: { lat: parseFloat(this.farmsOnSlide[index].lat), lng: parseFloat(this.farmsOnSlide[index].lng) },
          label: name,
          zoom: 8,

        });

        this.slideArr.push(this.abmarker)
      
      this.attachSecretMessage(this.abmarker,this.farmsOnSlide[index].name);
      }

      console.log("outside forloop");
    }


    this.loader.dismiss()
  }

  attachSecretMessage(marker, secretMessage) {
    var infowindow = new google.maps.InfoWindow({
      content: secretMessage
    });

    marker.addListener('click', function() {
      infowindow.open(marker.get('map'), marker);
    });
  }

  geocodeLatLng(location) {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ 'location': location }, function (results, status) {
        if (status === 'OK') {
          console.log('OK');
          console.log(status);
          let locName = results[0].formatted_address;
          this.destinationAddress = locName;
          console.log("Location Push:" + this.destinationAddress);
        } else {
          console.log(' not OK' + status);

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

        directionsDisplay.setOptions({ suppressMarkers: true });

      } else {
        console.log(status);

      }
    });
  }



  getDistance(destination) {

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
    console.log("distance core : " + this.distance);

  }




  slideChanged() {

    this.farmsOnSlide
    console.log(this.farmsOnSlide);

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
      }, (response, status) => {

        if (status == 'OK') {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
          console.log(this.kiloMeter);
          console.log(this.duration);
          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            console.log(this.kiloMeter);
            console.log(this.duration);
            for (var j = 0; j < results.length; j++) {
              var element = results[j];
              this.kiloMeter = element.distance.text;
              var dura = element.duration.text;

              console.log(this.kiloMeter);
              console.log(this.duration);

              var hourCheck = dura.indexOf("h")
              console.log(hourCheck);
              if (hourCheck > -1) {

                var splitted = dura.split(" ");
                console.log(splitted)
                var dur = splitted.splice(1, 1, "hr")
                console.log(dur);
                console.log(splitted);
                this.duration = splitted[0] + "" + splitted[1] + " " + splitted[2] + "" + splitted[3]


              } else {
                this.duration = dura
              }

            }
          }
        }
      });
    console.log(this.callback);


    document.getElementById("hidetime").style.display = "flex"
    document.getElementById("hidekilos").style.display = "flex"

    document.getElementById("time").style.display = "flex"
    document.getElementById("kilos").style.display = "flex"



  }

  callback(response, status) {
    console.log(this.kiloMeter);
    console.log(this.duration);
    if (status == 'OK') {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;
      console.log(this.kiloMeter);
      console.log(this.duration);
      for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;
        console.log(this.kiloMeter);
        console.log(this.duration);
        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          this.kiloMeter = element.distance.text;
          this.duration = element.duration.text;
          console.log(this.kiloMeter);
          console.log(this.duration);

        }
      }
    }
  }

  moreinfo(i) {


    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 1000,

    };

    this.nativePageTransitions.slide(options);
    var info = this.farmsOnSlide[i]
    this.navCtrl.push(DescriptionPage, { description: info }).then(() => {
      this.farmEatDb.farmView(info.k).then(() => {
        console.log("user has viewed");
        this.farmEatDb.getFarmView(info.k).then((data: any) => {
          console.log("number of views for this farm " + data);

        })
      })
    })
  }



  async serc(address) {

    this.farmsOnSlide = []
    this.nearbyArray = []
    //this.farmsOnSlide = []

    this.loader = this.loadingCtrl.create({
      content: "Please wait... Your map is still loading",
      duration: 8000
    });

    this.loader.present();
    console.log("search");

    let Searchlat;
    let Searchlng;

    document.getElementById("hide").style.display = "none"
    document.getElementById("hidetime").style.display = "none"
    document.getElementById("hidekilos").style.display = "none"
    document.getElementById("time").style.display = "none"
    document.getElementById("kilos").style.display = "none"
    this.searchbar = null;

    let geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': address }, (results, status) => {

      if (status === 'OK') {
        //this.desLatLng = results[0].geometry.location;

        Searchlat = results[0].geometry.location.lat();
        Searchlng = results[0].geometry.location.lng();


        console.log(Searchlat);
        console.log(Searchlat);
      }


      this.loca = new google.maps.LatLng(Searchlat, Searchlng);

      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        styles: this.mapStyle,

        center: { lat: parseFloat(Searchlat), lng: parseFloat(Searchlng) },
        disableDefaultUI: true,

      });

      // this.farmsOnSlide.length = 0
      // this.nearbyArray.length = 0;

      console.log(this.farmsOnSlide);

      let marker = new google.maps.Marker({
        map: this.map,
        zoom: 10,
        animation: google.maps.Animation.DROP,
        icon: {
          url: "../../assets/icon/manicon.png"
        },
        position: ({ lat: parseFloat(Searchlat), lng: parseFloat(Searchlng) })
      });


      var allFarmss = []

      setTimeout(() => {
        this.farmEatDb.getSearchbyFarms(Searchlat, Searchlng).then((radius) => {
          this.farmEatDb.getallFarms().then((data: any) => {
            console.log(data);
            allFarmss = data
            console.log(allFarmss);

            this.farmEatDb.getSearchedFarm(Searchlat, Searchlng, radius, data).then((data: any) => {
              console.log(data);

              this.farmsOnSlide = data
              this.nearbyArray = data
              console.log(this.farmsOnSlide);

              console.log(this.farmsOnSlide);

              if (this.farmsOnSlide.length == 0) {

                setTimeout(() => {

                  const alert = this.alertCtrl.create({
                    title: 'Notice',
                    subTitle: "Currently we don't have farms around your area, so we will locate you to an area that does",
                    cssClass: "myAlert",
                    buttons: [{
                      text: 'OK',
                      handler: data => {
                        console.log('OK clicked');
                        this.loader = this.loadingCtrl.create({
                          content: "Please wait... Your map is still loading",
                          duration: 5000
                        });

                        this.loader.present();
                        var defualtLat = -26.26213302840454
                        var defualtLng = 27.950475030301852

                        this.farmEatDb.getCurrentLocation(defualtLat, defualtLng).then((radius: any) => {
                          this.farmEatDb.getNearByOrganizations(radius, allFarmss).then((data: any) => {
                            if (this.nearbyArray.length == 0) {
                              this.nearbyArray = data;
                              this.farmsOnSlide = data;
                              console.log(this.farmsOnSlide);
                              for (let index = 0; index < this.farmsOnSlide.length; index++) {

                                if (this.farmsOnSlide[index].crops == true) {
                                  if (this.farmsOnSlide[index].aquatic == true) {
                                    this.icon = "../../assets/icon/icons-fish.pin.png";
                                    console.log(this.farmsOnSlide[index].aquatic);
                                  } else if (this.farmsOnSlide[index].beeKeeping == "true") {
                                    this.icon = "../../assets/icon/icons-bee.pin.png";
                                  } else if (this.farmsOnSlide[index].liveStock == "true") {
                                    this.icon = "../../assets/icon/icons-cow.pin.png";
                                  } else {
                                    this.icon = "../../assets/icon/icons-tree.pin.png";
                                  }
                                } else if (this.farmsOnSlide[index].aquatic == true) {
                                  this.icon = "../../assets/icon/icons-fish.pin.png";
                                  console.log(this.farmsOnSlide[index].aquatic);
                                } else if (this.farmsOnSlide[index].beeKeeping == true) {
                                  this.icon = "../../assets/icon/icons-bee.pin.png";
                                } else if (this.farmsOnSlide[index].liveStock == true) {
                                  this.icon = "../../assets/icon/icons-cow.pin.png";
                                }


                                console.log("Markers");

                                var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
                                this.abmarker = new google.maps.Marker({
                                  map: this.map,
                                  icon: this.icon,
                                  position: { lat: parseFloat(this.farmsOnSlide[index].lat), lng: parseFloat(this.farmsOnSlide[index].lng) },
                                  label: name,
                                  zoom: 14,

                                });



                                this.loca = new google.maps.LatLng(Searchlat, Searchlng);
                                let destination = new google.maps.LatLng(this.farmsOnSlide[index].lat, this.farmsOnSlide[index].lng);
                                this.calculateAndDisplayRoute(this.loca, destination, this.directionsDisplay, this.directionsService);

                                // this.abmarker.addListener('click', () => {
                                //   console.log("clicked marker");

                                //   //calling method to display route from a to b
                                //   this.calculateAndDisplayRoute(this.loca, destination, this.directionsDisplay, this.directionsService);

                                // })

                                this.attachSecretMessage(this.abmarker,this.farmsOnSlide[index].name);


                              }
                              console.log("no duplication");
                            } else if (this.nearbyArray.length > 0) {
                              console.log(' duplicate outttttt');

                            }
                          })
                        })
                      }
                    }]
                  });
                  alert.present();

                }, 2000)

                // document.getElementById("hide").style.display = "none"
                // this.searchbar = null;

              } else {

                document.getElementById("hide").style.display = "none"
                this.searchbar = null;

                for (let index = 0; index < this.farmsOnSlide.length; index++) {

                  if (this.farmsOnSlide[index].crops == true) {
                    if (this.farmsOnSlide[index].aquatic == true) {
                      this.icon = "../../assets/icon/icons-fish.pin.png";
                      console.log(this.farmsOnSlide[index].aquatic);
                    } else if (this.farmsOnSlide[index].beeKeeping == "true") {
                      this.icon = "../../assets/icon/icons-bee.pin.png";
                    } else if (this.farmsOnSlide[index].liveStock == "true") {
                      this.icon = "../../assets/icon/icons-cow.pin.png";
                    } else {
                      this.icon = "../../assets/icon/icons-tree.pin.png";
                    }
                  } else if (this.farmsOnSlide[index].aquatic == true) {
                    this.icon = "../../assets/icon/icons-fish.pin.png";
                    console.log(this.farmsOnSlide[index].aquatic);
                  } else if (this.farmsOnSlide[index].beeKeeping == true) {
                    this.icon = "../../assets/icon/icons-bee.pin.png";
                  } else if (this.farmsOnSlide[index].liveStock == true) {
                    this.icon = "../../assets/icon/icons-cow.pin.png";
                  }


                  console.log("Markers");

                  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
                  this.abmarker = new google.maps.Marker({
                    map: this.map,
                    icon: this.icon,
                    position: { lat: parseFloat(this.farmsOnSlide[index].lat), lng: parseFloat(this.farmsOnSlide[index].lng) },
                    label: name,
                    zoom: 12,

                  });



                  this.loca = new google.maps.LatLng(Searchlat, Searchlng);
                  let destination = new google.maps.LatLng(this.farmsOnSlide[index].lat, this.farmsOnSlide[index].lng);
                  this.calculateAndDisplayRoute(this.loca, destination, this.directionsDisplay, this.directionsService);

                  // this.abmarker.addListener('click', () => {
                  //   console.log("clicked marker");

                  //   //calling method to display route from a to b
                  //   this.calculateAndDisplayRoute(this.loca, destination, this.directionsDisplay, this.directionsService);

                  // })

                  this.attachSecretMessage(this.abmarker,this.farmsOnSlide[index].name);


                }


              }




            })

          })
        })
      }, 5000);



    })

  }

  initializeItems() {
    this.items = [
      "Soweto diepkloof",
      "Soweto Maponya",
      "Soweto South gate Mall",
      "Midrand",
      "Braamfontein",
      "Durban",
      "Capetown",
      "Pretoria",
      "Krugerdorp",
      "Johannesburg",
      "Rustenburg",
      "Eastern Cape",
      "Kwazulu Natal",
      "Vaal",
      "Vereeniging",
      "Mpumalanga",
      "Kempton Park",
      "Alexandra Gauteng",
      "Lenasia",
      "Lenasia South",
      "Sebokeng",
      "Newcastle",
      
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
      document.getElementById("hide").style.display = "block"
    }

  }


  display() {

    //document.getElementById("hide").style.display="block"
    if (this.searchbar == "") {
      document.getElementById("hide").style.display = "none";
      // document.getElementById("cardsHide").style.display="block"

    } else {
      document.getElementById("hide").style.display = "block";

      //document.getElementById("cardsHide").style.display="none"

    }

  }

  getProvinceStats() {
    for (let index = 0; index < this.provinces.length; index++) {
      const province = this.provinces[index];


    }
  }

}
