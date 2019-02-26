import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Backdrop ,Keyboard} from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { EmailValidator } from '@angular/forms';
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Comments2Page } from '../comments2/comments2'
import { RatingsPage } from '../ratings/ratings';
import { FarmEatProvider } from '../../providers/farm-eat/farm-eat'
import * as moment from 'moment'
/**
 * Generated class for the DescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-description',
  templateUrl: 'description.html',
})
export class DescriptionPage {
  pet
  description = this.navParams.get("description");
  name: string;
  desc: string;
  address: string;
  image: string;
  type: string;
  crops: string;
  liveStock: string;
  aquatic: string;
  beeKeeping: string;
  tel: string;
  email: string;
  website: string;
  facebook: string;
  farmUserK
  farmRate
  products = []
  key;

  testarray = [{ lat: 23.35, long: 34.12 }, { lat: 56.67, long: 23.89 }, { lat: 78.45, long: 78.6 }]
  // farmKey = this.navParams.get("key");
  // userKey = this.navParams.get("userK")
  userRate = 0;
  userComment;

  constructor(public navCtrl: NavController, public navParams: NavParams, private launchNavigator: LaunchNavigator, private callNumber: CallNumber, private socialSharing: SocialSharing, private farmEAt: FarmEatProvider, private keyboard: Keyboard) {
    this.pet = "kittens";
    console.log(this.description);
    console.log(this.userRate);

    this.name = this.description.name
    this.desc = this.description.description
    this.address = this.description.address
    this.image = this.description.image
    this.crops = this.description.crops
    this.liveStock = this.description.liveStock
    this.aquatic = this.description.aquatic
    this.beeKeeping = this.description.beeKeeping
    this.tel = this.description.tel
    this.email = this.description.email
    this.website = this.description.website
    this.facebook = this.description.facebook
    this.type = this.type
    this.products = this.description.products
    this.key = this.description.k
    this.farmUserK = this.description.userK
    this.farmRate = this.description.farmRate
    console.log(this.facebook);
    console.log(this.website);
    console.log(this.tel);
    console.log(this.email);
    console.log(this.farmRate);

    console.log("below is the products");

    console.log(this.products);

  }



  navigate() {
    this.launchNavigator.navigate(this.address)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

  call(tel) {
    this.callNumber.callNumber(tel, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  sendEmail(email) {
    // Share via email
    this.socialSharing.shareViaEmail('Body', 'Subject', [email]).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }


  slideChanged() {
    //let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is');


  }


  comment() {
    this.navCtrl.push(Comments2Page, { key: this.key })
  }

  ionViewDidLoad() {



  }

  userRates(val) {
    console.log(val);
    this.userRate = val
    this.ionViewDidLoad()
  }


  rate() {
   
    var dismisser = document.getElementsByClassName("divhead") as HTMLCollectionOf <HTMLElement>;
    dismisser[0].style.display = "block"
    document.getElementById('locate').style.display = "none"
    document.getElementById('rate').style.display = "block"
  }

  submit() {
    var today = new Date()
    console.log(today);
    var comDate = moment(today).format('ll');
    console.log(this.userComment, this.userRate);
// console.log(this.userComment.length);
console.log(this.key, this.userRate, this.farmUserK);



if(this.userComment != undefined && this.userComment != "" && this.userRate > 0){
  console.log("all is good");
  this.farmEAt.addComments(this.key, this.userComment, comDate).then(()=>{
    this.farmEAt.rate(this.key, this.userRate, this.farmUserK).then(() => {
      alert("Rate and Comments submitted successfully")
      this.navCtrl.push(Comments2Page,{key : this.description.k})
      var dismisser = document.getElementsByClassName("divhead") as HTMLCollectionOf <HTMLElement>;
      dismisser[0].style.display = "none"
      document.getElementById('locate').style.display = "block"
      document.getElementById('rate').style.display = "none"
    })
  })
}else if(this.userComment == undefined || this.userComment == ""){
  if( this.userRate > 0){
    console.log("rate is good");
    this.farmEAt.rate(this.key, this.userRate, this.farmUserK).then(() => {
      alert("Rate submitted successfully")
      var dismisser = document.getElementsByClassName("divhead") as HTMLCollectionOf <HTMLElement>;
      dismisser[0].style.display = "none"
      document.getElementById('locate').style.display = "block"
      document.getElementById('rate').style.display = "none"
    })
  }else{
    console.log("none is good");
    alert("Please rate or comment on the farm")
  }
}else if(this.userComment != undefined && this.userComment != ""){
  if( this.userRate > 0){
    console.log("all is good");
    this.farmEAt.addComments(this.key, this.userComment, comDate).then(()=>{
      this.farmEAt.rate(this.key, this.userRate, this.farmUserK).then(() => {
        alert("Rate and Comments submitted successfully")
        this.navCtrl.push(Comments2Page,{key : this.description.k})
        var dismisser = document.getElementsByClassName("divhead") as HTMLCollectionOf <HTMLElement>;
      dismisser[0].style.display = "none"
      document.getElementById('locate').style.display = "block"
      document.getElementById('rate').style.display = "none"
      })
    })
  }else{
    console.log("comment is good");
    this.farmEAt.addComments(this.key, this.userComment, comDate).then(()=>{
     
        alert("Comments submitted successfully")
     this.navCtrl.push(Comments2Page,{key : this.description.k})
     var dismisser = document.getElementsByClassName("divhead") as HTMLCollectionOf <HTMLElement>;
      dismisser[0].style.display = "none"
      document.getElementById('locate').style.display = "block"
      document.getElementById('rate').style.display = "none"
    })
  }
}


  }




 
 
}
