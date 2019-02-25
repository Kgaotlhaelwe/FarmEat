import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FarmEatProvider } from '../../providers/farm-eat/farm-eat'
/**
 * Generated class for the RatingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ratings',
  templateUrl: 'ratings.html',
})
export class RatingsPage {
  farmKey = this.navParams.get("key");
  userKey = this.navParams.get("userK")
  userRate;
  constructor(public navCtrl: NavController, public navParams: NavParams, private farmEAt: FarmEatProvider) {
  }

  ionViewDidLoad() {

    var star1 =  <HTMLInputElement>document.getElementById('s1');
    var star2 =  <HTMLInputElement>document.getElementById('s2');
    var star3 =  <HTMLInputElement>document.getElementById('s3');
    var star4 =  <HTMLInputElement>document.getElementById('s4');
    var star5 =  <HTMLInputElement>document.getElementById('s5');

    console.log('ionViewDidLoad RatingsPage');
    if(this.userRate == 1){
      star1.style.backgroundColor = "gold";
      star2.style.backgroundColor = "transparent";
      star3.style.backgroundColor = "transparent";
      star4.style.backgroundColor = "transparent";
      star5.style.backgroundColor = "transparent";
    }else if(this.userRate == 2){
      star1.style.backgroundColor = "gold";
      star2.style.backgroundColor = "gold";
      star3.style.backgroundColor = "transparent";
      star4.style.backgroundColor = "transparent";
      star5.style.backgroundColor = "transparent";
    }else if(this.userRate == 3){
      star1.style.backgroundColor = "gold";
      star2.style.backgroundColor = "gold";
      star3.style.backgroundColor = "gold";
      star4.style.backgroundColor = "transparent";
      star5.style.backgroundColor = "transparent";
    }else if(this.userRate == 4){
      star1.style.backgroundColor = "gold";
      star2.style.backgroundColor = "gold";
      star3.style.backgroundColor = "gold";
      star4.style.backgroundColor = "gold";
      star5.style.backgroundColor = "transparent";
    }else if(this.userRate == 5){
      star1.style.backgroundColor = "gold";
      star2.style.backgroundColor = "gold";
      star3.style.backgroundColor = "gold";
      star4.style.backgroundColor = "gold";
      star5.style.backgroundColor = "gold";
    }
    
  }

  userRates(val){
    console.log(val);
    this.userRate = val
    this.ionViewDidLoad()
  }
  

  rate(){

    console.log( this.userKey);
    
    if(this.userRate != undefined){
      this.farmEAt.rate(this.farmKey, this.userRate, this.userKey).then(()=>{
        alert("you've rated successfully")
      })
    }
    
  }

}
