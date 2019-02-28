import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FarmEatProvider} from '../../providers/farm-eat/farm-eat'
import { MoreinforPage } from '../moreinfor/moreinfor';

/**
 * Generated class for the NewsfeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newsfeed',
  templateUrl: 'newsfeed.html',
})
export class NewsfeedPage {

  newsFeedArray = new Array() ;

  constructor(public navCtrl: NavController, public navParams: NavParams, private farmEatDb:FarmEatProvider) {
    this.farmEatDb.getNewsFeed().then((data:any)=>{
      this.newsFeedArray=data ;

      console.log(this.newsFeedArray);
      



    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsfeedPage');
  }

  back(){
    this.navCtrl.pop()
   }
  more(image , title , message){

    let obj = {
      image:image ,
      title:title ,
      message:message
    }
this.navCtrl.push(MoreinforPage, {readMore:obj})


  }

}
