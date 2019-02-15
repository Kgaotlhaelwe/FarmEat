import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Keyboard, MenuController } from 'ionic-angular';
import { user } from '../model/user';
declare var firebase
import { FarmEatProvider } from '../../providers/farm-eat/farm-eat'
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
  user = {} as user;
  pet
  constructor(public navCtrl: NavController, public navParams: NavParams, public farmEatDb: FarmEatProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private keyboard: Keyboard, private nativePageTransitions: NativePageTransitions, public menuCtrl: MenuController) {
    this.pet = "kittens";
    this.menuCtrl.enable(false, 'myMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  Login(user: user) {

   

    if (user.email != undefined && user.password != undefined) {
      const loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 2000
      });
      loader.present();
      this.farmEatDb.login(user.email, user.password).then(() => {
        const loader = this.loadingCtrl.create({
          content: "Logging in please wait...",
          duration: 2000
        });
        loader.present();
        var users = firebase.auth().currentUser;
        console.log(users.uid);

        setTimeout(() => {
          this.navCtrl.setRoot(HomePage)
        }, 2000)



      }, (error) => {
        const alert = this.alertCtrl.create({
          // title: 'Error!',
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();



      })
    } else {
      
      var element = <HTMLInputElement>document.getElementById("btnExcel");
      element.disabled = true;
      alert("disable")
    }
  }

  forgetPassword(user: user) {
    const prompt = this.alertCtrl.create({
      title: 'Forget Password',
      //message: "Enter your Email....",
      inputs: [
        {
          name: 'name',
          placeholder: 'Enter your Email....'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {

            console.log('Saved clicked');
            const loader = this.loadingCtrl.create({
              content: "Please wait...",
              duration: 2000
            });
            loader.present();
            var em: string = data.name
            console.log(em.indexOf(' '));
            if (em.indexOf(' ') == -1) {
              this.farmEatDb.forgetPassword(data.name).then(() => {

                const alert2 = this.alertCtrl.create({
                  subTitle: "We have sent you email to recover password, Please check your Email",
                  buttons: ['OK']
                });
                alert2.present();
              }).catch((error) => {
                //alert(error.message)

                const alert = this.alertCtrl.create({
                  subTitle: error.message,
                  buttons: ['OK']
                });
                alert.present();


              })
            } else {
              var emailLength = em.length
              console.log(emailLength);
              var constructedEmail = em.substring(0, emailLength - 1)
              console.log(em.substring(0, emailLength - 1));
              this.farmEatDb.forgetPassword(constructedEmail).then(() => {

                const alert = this.alertCtrl.create({
                  subTitle: "We have sent you email to recover password, Please check your Email",
                  buttons: ['OK']
                });
                alert.present();
              })
            }


          }
        }
      ]
    });
    prompt.present();
  }

  register() {

    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 1000,

    };

    this.nativePageTransitions.slide(options);
    this.navCtrl.push(RegisterPage)
  }


  Register(user: user) {
    console.log(user.username);
    console.log(user.password);
    console.log(user.email);

    if (this.user.email != null && this.user.password != null) {
      const loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 2000
      });
      loader.present();
      this.farmEatDb.register(user.email, user.password, user.username).then(() => {
        const loader = this.loadingCtrl.create({
          content: "Loggin in please wait...",
          duration: 2000
        });
        loader.present();

        setTimeout(() => {
          this.navCtrl.setRoot(HomePage)
        }, 2000)


      }, (error) => {


        const alert = this.alertCtrl.create({
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();


      })
    } else {
      var element = <HTMLInputElement>document.getElementById("btnExcel");
      element.disabled = true;
    }
  }


  changeColor() {
    console.log("V");

    document.getElementById("fullgreen").style.display = "none";
  }

}
