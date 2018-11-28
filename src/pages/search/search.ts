import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
 

  constructor(public platform: Platform,public navCtrl: NavController, public navParams: NavParams,private keyboard: Keyboard) {
    this.platform.ready().then(() => {

      this.keyboard.show();
    })
    
    console.log(this.keyboard.show());
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
