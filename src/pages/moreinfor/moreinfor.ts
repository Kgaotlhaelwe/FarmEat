import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FarmEatProvider} from '../../providers/farm-eat/farm-eat'
/**
 * Generated class for the MoreinforPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-moreinfor',
  templateUrl: 'moreinfor.html',
})
export class MoreinforPage {

  readMore = this.navParams.get("readMore") ;

  image ;
  title ;
  message ;

  constructor(public navCtrl: NavController, public navParams: NavParams,private farmEatDb:FarmEatProvider) {

    this.image=this.readMore.image ;
    this.title =this.readMore.title ;
    this.message =this.readMore.message ;

  }


 back(){
    this.navCtrl.pop()
   }
   
  ionViewDidLoad() {
    console.log('ionViewDidLoad MoreinforPage');
  }

}
