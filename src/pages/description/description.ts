import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
<<<<<<< HEAD
    this.pet="kittens";
=======
      this.name = this.description.name
      this.desc = this.description.description
      this.address = this.description.address
      this.image = this.description.image
>>>>>>> c9c9a12b3bd6fa26ecc3b4bb4b089c03204210a0
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DescriptionPage');

    console.log(this.description);
    
  }

}
