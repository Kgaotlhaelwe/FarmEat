import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { EmailValidator } from '@angular/forms';
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';
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
  description = this. navParams.get("description");
  name:string;
  desc:string;
  address:string;
  image: string;
  crops:string;
  liveStock:string;
  aquatic: string;
  beeKeeping:string;
  tel:string;
  email:string;
  website:string;
  facebook:string;


  testarray = [{lat:23.35 ,long:34.12} , {lat:56.67, long:23.89} , {lat:78.45, long:78.6}]

  constructor(public navCtrl: NavController, public navParams: NavParams, private launchNavigator: LaunchNavigator, private callNumber: CallNumber,private socialSharing: SocialSharing) {
    this.pet="kittens";  
    console.log(this.description);
    
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
      console.log(this.facebook);
      console.log(this.website);
      console.log(this.tel);
      console.log(this.email);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescriptionPage');

    console.log(this.description);
    
  }

  navigate(){
    this.launchNavigator.navigate(this.address)
  .then(
    success => console.log('Launched navigator'),
    error => console.log('Error launching navigator', error)
  );
  }

  call(tel){
    this.callNumber.callNumber(tel, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

  sendEmail(email){
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

 



}
