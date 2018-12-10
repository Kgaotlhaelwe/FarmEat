import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,Keyboard} from 'ionic-angular';
import {user} from '../model/user';
declare var firebase
import {FarmEatProvider} from '../../providers/farm-eat/farm-eat'
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as user ;
  constructor(public navCtrl: NavController, public navParams: NavParams, public farmEatDb:FarmEatProvider, public alertCtrl:AlertController, public loadingCtrl:LoadingController,  private keyboard: Keyboard, private nativePageTransitions: NativePageTransitions) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  Login(user:user){

    
   
    if(user.email !=undefined && user.password !=undefined){
      this.farmEatDb.login(user.email ,user.password).then(()=>{
        var users= firebase.auth().currentUser;
        console.log(users.uid);
        
      
        // const loader = this.loadingCtrl.create({
        //   content: "Logging in please wait...",
        //   duration: 3000
        // });
        // loader.present();
        this.navCtrl.setRoot(HomePage)
      
      
      
      } ,(error)=>{
        const alert = this.alertCtrl.create({
          // title: 'Error!',
          subTitle:  error.message,
          buttons: ['OK']
        });
        alert.present();
       
      
  
      })
    }else{
      const alert = this.alertCtrl.create({
        subTitle: 'Please enter all details',
        buttons: ['OK']
      });
      alert.present();

    }
  }
  forgetPassword(user:user){
    this.farmEatDb.forgetPassword(user.email).then(()=>{

      const alert = this.alertCtrl.create({
        subTitle:  "We have sent you email to recover password, Please check your Email",
        buttons: ['OK']
      });
      alert.present();
      
    } , (error)=>{

      const alert = this.alertCtrl.create({
        subTitle:  "Please fill in the email field. ",
        buttons: ['OK']
      });
      alert.present();

    })
  }
  register(){
    
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 1000,
      
     };
 
    this.nativePageTransitions.slide(options);
    this.navCtrl.push(RegisterPage)
  }




  
}
