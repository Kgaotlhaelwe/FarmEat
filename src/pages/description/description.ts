import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
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

  description = this. navParams.get("description");
  name:string;
  desc:string;
  address:string;
  image: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private launchNavigator: LaunchNavigator) {
      this.name = this.description.name
      this.desc = this.description.description
      this.address = this.description.address
      this.image = this.description.image
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

}
