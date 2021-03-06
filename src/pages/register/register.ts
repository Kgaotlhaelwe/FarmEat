import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController, LoadingController, ToastController, Keyboard } from 'ionic-angular';
import {user} from '../model/user';
declare var firebase
import {FarmEatProvider} from '../../providers/farm-eat/farm-eat'
import { LoginPage } from '../login/login';
import { HomePage } from '../../pages/home/home';
import { DescriptionPage } from '../description/description';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';



/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as user ;
  constructor(public navCtrl: NavController, public navParams: NavParams , public farmEatDb:FarmEatProvider,   private keyboard: Keyboard, private nativePageTransitions: NativePageTransitions, public alertCtrl:AlertController, public loadingCtrl:LoadingController, public toastCtrl :ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  Register(user:user){
    console.log(user.username);
    console.log(user.password);
    console.log(user.email);
  
    if(this.user.email !=null  && this.user.password  !=null  ){
    this.farmEatDb.register(user.email ,user.password, user.username ).then(()=>{
   
     
    //   const alert = this.alertCtrl.create({
    //     subTitle: 'You have successfully registered',
    //     buttons: ['OK']
    //   });
    //   alert.present();
     
    //   this.navCtrl.setRoot(HomePage)
    // } 
    // const loader = this.loadingCtrl.create({
    //   content: "Logging in please wait...",
    //   duration: 3000
    // });
    this.navCtrl.setRoot(HomePage)
    //loader.present();
  
  
  }, (error)=>{
 
 
      const alert = this.alertCtrl.create({
        subTitle:error.message,
        buttons: ['OK']
      });
      alert.present();
     
 
    })
  }else{
    const alert = this.alertCtrl.create({
      subTitle:  'Please enter email and password' ,
      buttons: ['OK']
    });
    alert.present();
  }
  }



  
  Login(){
      
    let options: NativeTransitionOptions = {
      direction: 'down',
      duration: 1000,
      
     };
 
    this.nativePageTransitions.slide(options);
    this.navCtrl.push(LoginPage)
  }
}
