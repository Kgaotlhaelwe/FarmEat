import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FarmEatProvider } from '../../providers/farm-eat/farm-eat';
import * as moment from 'moment'
/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  key = this.navParams.get("key");
  comments = []
  message;
  constructor(public navCtrl: NavController, public navParams: NavParams, private farmEat: FarmEatProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }

  ionViewWillEnter(){
    this.farmEat.getComments(this.key).then((data:any)=>{
      console.log(data);
    })
  }

  comment(){

    var today = new Date()
    console.log();
    
    
  }

}
