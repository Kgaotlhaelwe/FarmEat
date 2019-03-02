import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Backdrop, Keyboard, AlertController, ToastController, LoadingController } from 'ionic-angular';
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
  subBtn;

  cancelBtn;
  testarray = [{ lat: 23.35, long: 34.12 }, { lat: 56.67, long: 23.89 }, { lat: 78.45, long: 78.6 }]
 
  userRate = 0;
  userComment;

  constructor(public navCtrl: NavController, public toastController: ToastController, public loadingCtrl: LoadingController, public navParams: NavParams, private launchNavigator: LaunchNavigator, private callNumber: CallNumber, private socialSharing: SocialSharing, private farmEAt: FarmEatProvider, private keyboard: Keyboard, public alertCtrl: AlertController) {
    this.pet = "kittens";
    console.log(this.description);
    console.log(this.userRate);


    this.cancelBtn = true;
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
  
  }

  commentField() {
    if (this.userComment == "") {
      this.subBtn.disabled = true;
    } else if (this.userComment == undefined) {
      this.subBtn.disabled = true;
    } else if (this.userComment.length > 0) {
      this.subBtn.disabled = false;
    }

  }


  rate() {
    var rate = document.getElementById('rate')
    var locate = document.getElementById('locate')
    var dismisser = document.getElementsByClassName("divhead") as HTMLCollectionOf<HTMLElement>;

    console.log(rate);
    console.log(locate);
    console.log(dismisser[0]);

    rate.style.display == "block";
    locate.style.display == "none"
    dismisser[0].style.display = "block"
    if (document.getElementById('rate').style.display == "none") {
      console.log('in');

      var dismisser = document.getElementsByClassName("divhead") as HTMLCollectionOf<HTMLElement>;
      dismisser[0].style.display = "block"
      document.getElementById('locate').style.display = "none"
      document.getElementById('rate').style.display = "block"

    
      this.subBtn = <HTMLInputElement>document.getElementById("subBtn");
      
    } else if (document.getElementById('rate').style.display == "block") {
      console.log('mid');
      var dismisser = document.getElementsByClassName("divhead") as HTMLCollectionOf<HTMLElement>;
      dismisser[0].style.display = "none"
      document.getElementById('locate').style.display = "bloc"
      document.getElementById('rate').style.display = "none"
      this.subBtn = <HTMLInputElement>document.getElementById("subBtn");
      console.log(this.subBtn);

    }

    else {
      console.log('out');
      var dismisser = document.getElementsByClassName("divhead") as HTMLCollectionOf<HTMLElement>;
      dismisser[0].style.display = "block"
      document.getElementById('locate').style.display = "none"
      document.getElementById('rate').style.display = "block"
      this.subBtn = <HTMLInputElement>document.getElementById("subBtn");
      console.log(this.subBtn);
      this.cancelBtn = true
    }


  }

  submit() {

    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
    });
    loader.present();

    var today = new Date()
    console.log(today);
    var comDate = moment(today).startOf("minute").fromNow();
    console.log(this.userComment, this.userRate);
   
    console.log(this.key, this.userRate, this.farmUserK);
    setTimeout(() => {
      if (this.userRate != 0) {
        this.farmEAt.rate(this.key, this.userRate, this.farmUserK).then(() => {
          const toast = this.toastController.create({
            message: 'Rate submitted successfully.',
            duration: 2000
          });
          toast.present();
  
          var dismisser = document.getElementsByClassName("divhead") as HTMLCollectionOf<HTMLElement>;
          this.userRate = 0
          dismisser[0].style.display = "none"
          document.getElementById('locate').style.display = "block"
          document.getElementById('rate').style.display = "none"
        })
      } else {
        const toast = this.toastController.create({
          message: 'You need to rate the Farm.',
          duration: 2000
        });
        toast.present();
  
      }
    }, 2000);

   


    // if(this.userComment != undefined && this.userComment != "" && this.userRate > 0){
    //   console.log("all is good");
    //   setTimeout(() => {
    //     this.farmEAt.addComments(this.key, this.userComment, comDate).then(()=>{
    //       this.farmEAt.rate(this.key, this.userRate, this.farmUserK).then(() => {

    //         const toast = this.toastController.create({
    //           message: 'Rate and Comments submitted successfully.',
    //           duration: 2000
    //         });
    //         toast.present();

    //         this.navCtrl.push(Comments2Page,{key : this.description.k})
    //         this.userComment = "" 
    //         this.userRate = 0
    //         var dismisser = document.getElementsByClassName("divhead") as HTMLCollectionOf <HTMLElement>;
    //         dismisser[0].style.display = "none"
    //         document.getElementById('locate').style.display = "block"
    //         document.getElementById('rate').style.display = "none"
    //       })
    //     })
    //   }, 2000);


    // }else if(this.userComment == undefined || this.userComment == ""){
    //   if( this.userRate > 0){
    //     setTimeout(() => {
    //       console.log("rate is good");
    //       this.farmEAt.rate(this.key, this.userRate, this.farmUserK).then(() => {
    //         const toast = this.toastController.create({
    //           message: 'Rate submitted successfully.',
    //           duration: 2000
    //         });
    //         toast.present();

    //         var dismisser = document.getElementsByClassName("divhead") as HTMLCollectionOf <HTMLElement>;
    //         this.userRate = 0
    //         dismisser[0].style.display = "none"
    //         document.getElementById('locate').style.display = "block"
    //         document.getElementById('rate').style.display = "none"
    //       })
    //     }, 2000);

    //   }else{
    //     setTimeout(() => {
    //       const toast = this.toastController.create({
    //         message: 'Please rate or comment on the farm.',
    //        // duration: 2000
    //       });
    //       toast.present();
    //     }, 2000);



    //   }
    // }else if(this.userComment != undefined && this.userComment != ""){
    //   if( this.userRate > 0){
    //     setTimeout(() => {
    //       console.log("all is good");
    //     this.farmEAt.addComments(this.key, this.userComment, comDate).then(()=>{
    //       this.farmEAt.rate(this.key, this.userRate, this.farmUserK).then(() => {
    //         const toast = this.toastController.create({
    //           message: 'Rate and Comments submitted successfully.',
    //           duration: 2000
    //         });
    //         toast.present();


    //         this.navCtrl.push(Comments2Page,{key : this.description.k})
    //         this.userComment = "" 
    //         this.userRate = 0
    //         var dismisser = document.getElementsByClassName("divhead") as HTMLCollectionOf <HTMLElement>;
    //       dismisser[0].style.display = "none"
    //       document.getElementById('locate').style.display = "block"
    //       document.getElementById('rate').style.display = "none"
    //       })
    //     })
    //     }, 2000);

    //   }else{
    //     setTimeout(() => {
    //       console.log("comment is good");
    //     this.farmEAt.addComments(this.key, this.userComment, comDate).then(()=>{
    //       const toast = this.toastController.create({
    //         message: 'Comments submitted successfully.',
    //         duration: 2000
    //       });
    //       toast.present();


    //      this.navCtrl.push(Comments2Page,{key : this.description.k})
    //      this.userComment = ""  
    //      var dismisser = document.getElementsByClassName("divhead") as HTMLCollectionOf <HTMLElement>;
    //       dismisser[0].style.display = "none"
    //       document.getElementById('locate').style.display = "block"
    //       document.getElementById('rate').style.display = "none"
    //     })
    //     }, 2000);

    //   }
    // }


  }




  cancelRating() {
    console.log("clicked");
    var dismisser = document.getElementsByClassName("divhead") as HTMLCollectionOf<HTMLElement>;
    dismisser[0].style.display = "none"
    document.getElementById('locate').style.display = "block"
    document.getElementById('rate').style.display = "none"

  }

}
