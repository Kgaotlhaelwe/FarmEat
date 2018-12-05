
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

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;


  constructor(public navCtrl: NavController, public navParams: NavParams, private geo: Geolocation, private farmEatDb: FarmEatProvider, public alertCtrl: AlertController) {

  }


  ionViewDidEnter() {

    // this.deleteMarkers()

    this.nearbyArray = [];

    if (this.trackSearch.length == 0) {
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
    } else if (this.trackSearch.length == 1) {


      this.farmEatDb.getSearchbyFarms(this.searchArea.lat, this.searchArea.lng).then((radius: any) => {
        console.log(radius);
        this.farmEatDb.getallFarms().then((data: any) => {
          console.log(data);

          this.farmEatDb.getSearchedFarm(this.searchArea.lat, this.searchArea.lng, radius, data).then((data: any) => {
            console.log(data);
            this.nearbyArray = data;
            console.log(this.nearbySeachFarmArray);
            if (this.nearbyArray.length == 0) {
              const alert = this.alertCtrl.create({
                title: 'Confirmation',
                subTitle: 'Currently we dont have Farms around your Area',
                buttons: ['OK']
              });
              alert.present();

            } else {


            }
          })
        })

      })





    }

    setTimeout(() => {
      this.loadMap();
    }, 2000)






  }


  loadMap() {
    //this.clearMarkers();
    this.geo.getCurrentPosition().then((position) => {

      //declaring google map services
      // const directionsService = new google.maps.DirectionsService;
      // const directionsDisplay = new google.maps.DirectionsRenderer;


      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;

      this.loca = new google.maps.LatLng(this.lat, this.lon);

      //getting an address from coordinates
      //this.geocodeLatLng()
      console.log(position)

      //map options
      const options = {
        center: { lat: this.lat, lng: this.lon },
        zoom: 10,
        disableDefaultUI: true,
        styles: [
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }
        ]
        //streetViewControl: false,
        //mapTypeId: 'satellite'
      }

      this.map = new google.maps.Map(this.mapRef.nativeElement, options);

      if (this.trackSearch.length == 0) {


        // var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
        let marker = new google.maps.Marker({
          map: this.map,
          zoom: 10,
          //icon: iconBase + 'info-i_maps.png',
          //animation: google.maps.Animation.DROP,


          animation: google.maps.Animation.DROP,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          },
          position: this.map.getCenter()
        });


      } else if (this.trackSearch.length == 1) {
        console.log("second if statata");

        let a = this.searchArea.lat;
        let b = this.searchArea.lng




        let marker = new google.maps.Marker({
          map: this.map,
          zoom: 8,
          // animation: google.maps.Animation.DROP,
          position: this.map.setCenter({ lat: parseFloat(a), lng: parseFloat(b) })
        });

      }

      this.directionsDisplay.setMap(this.map);

      for (let index = 0; index < this.nearbyArray.length; index++) {
        console.log(this.nearbyArray);
        console.log('out');
        console.log(this.nearbyArray[index].aquatic);
        console.log(this.nearbyArray[index].beeKeeping);
        console.log(this.nearbyArray[index].crops);
        if (this.nearbyArray[index].aquatic == "true") {
          this.icon = '../../assets/imgs/fish-icon.png';
          console.log('inaqautic');

          console.log(this.nearbyArray[index].aquatic);
        } else if (this.nearbyArray[index].beeKeeping == "true") {
          this.icon = "../../assets/imgs/fish-icon.png";
          console.log('inbeekeeping');
        } else if (this.nearbyArray[index].crops == "true") {
          this.icon = "../../assets/imgs/fish-icon.png";
          console.log('incrop');
        }



        // console.log(lat +" "+lng);
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
        this.abmarker = new google.maps.Marker({
          map: this.map,
          icon: this.icon,

          //animation: google.maps.Animation.DROP,
          position: { lat: parseFloat(this.nearbyArray[index].lat), lng: parseFloat(this.nearbyArray[index].lng) },
          label: name,
          zoom: 8,

        });

        this.slideArr.push(this.abmarker)
        console.log(this.slideArr);

        let destination = new google.maps.LatLng(this.nearbyArray[index].lat, this.nearbyArray[index].lng);

        this.abmarker.addListener('click', () => {


          console.log("clicked marker");

          //calling method to display route from a to b
          this.calculateAndDisplayRoute(this.loca, destination, this.directionsDisplay, this.directionsService);

          // var name = this.nearbyArray[index].name;
          // var description = this.nearbyArray[index].description;
          // var tel = this.nearbyArray[index].tel;
          // var email = this.nearbyArray[index].email;
          // var address = this.nearbyArray[index].address;
          // var facebook = this.nearbyArray[index].facebook;
          // var beeKeeping = this.nearbyArray[index].beeKeeping;
          // var liveStock = this.nearbyArray[index].liveStock;
          // var website = this.nearbyArray[index].website;
          // var aquatic = this.nearbyArray[index].aquatic;
          // var crops = this.nearbyArray[index].crops;
          // var image = this.nearbyArray[index].image;
          // console.log(name);
          // let obj = {

          //   name: name,
          //   description: description,
          //   tel: tel,
          //   email: email,
          //   address: address,
          //   facebook: facebook,
          //   beeKeeping: beeKeeping,
          //   liveStock: liveStock,
          //   website: website,
          //   aquatic: aquatic,
          //   crops: crops,
          //   image: image
          // }
          // this.navCtrl.push(DescriptionPage, { description: obj })
        })

      }



    })
  }

  //getting address from coordinates
  geocodeLatLng(geocoder, location) {
    return new Promise((resolve, reject) => {
      geocoder.geocode({ 'location': location }, function (results, status) {
        if (status === 'OK') {
          let locName = results[0].formatted_address;
          let locStart = locName.split(",");
          this.locationAddress = locStart[0];
          console.log(locStart);
          console.log("Location Push:" + this.locationAddress);
        } else {
          window.alert('Geocoder failed due to: ' + status);
        } resolve(this.locationAddress);
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
        directionsDisplay.setMap(this.map);
        directionsDisplay.setOptions( { suppressMarkers: true } );
      } else {
        console.log(status);

        window.alert('Directions request failed due to ' + status);
      }
    });
  }


  slideChanged() {

    //declaring google map services
    // var directionsService = new google.maps.DirectionsService;
    // var directionsDisplay = new google.maps.DirectionsRenderer;

    let currentIndex = this.slides.getActiveIndex();
    let currentLat = this.nearbyArray[currentIndex].lat
    let currentLon = this.nearbyArray[currentIndex].lng
    console.log(this.slideArr[currentIndex].getAnimation());


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
    let marker = new google.maps.Marker({
      // map: this.map,
      //icon: iconBase + 'farm_maps.png',


      position: this.map.setCenter({ lat: parseFloat(currentLat), lng: parseFloat(currentLon) }),
      //animation: this.slideArr[currentIndex].setAnimation(google.maps.Animation.BOUNCE),
      label: name,
      zoom: 20,
    })

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
  search() {
    this.navCtrl.push(SearchPage)
  }
}
