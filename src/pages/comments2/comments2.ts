import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FarmEatProvider } from '../../providers/farm-eat/farm-eat';
import * as moment from 'moment'

/**
 * Generated class for the Comments2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments2',
  templateUrl: 'comments2.html',
})
export class Comments2Page {

  key = this.navParams.get("key");
  comments = []
  message;

  constructor(public navCtrl: NavController, public navParams: NavParams, private farmEat: FarmEatProvider) {
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad");
  }

  ionViewWillLoad(){
    console.log("ionViewWillLoad");
    this.getCommets()
  }

  getCommets(){
    console.log('ionViewDidLoad Comments2Page');
    this.farmEat.getComments(this.key).then((data:any)=>{
      console.log(data);
      this.comments = data
    })
  }

  comment(){

    var today = new Date()
    console.log(today);
    var comDate = moment(today).format('ll');
    this.farmEat.addComments(this.key, this.message, comDate).then(()=>{
      this.message = ""
      this.ionViewWillLoad()
    
      
    })
  }
}
