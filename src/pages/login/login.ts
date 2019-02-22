import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Keyboard, MenuController } from 'ionic-angular';
import { user } from '../model/user';
declare var firebase
import { FarmEatProvider } from '../../providers/farm-eat/farm-eat'
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';

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

  btn;

  pass = 0
  usrn = 0
  mail = 0
  // state = false
  constructor(public navCtrl: NavController, public navParams: NavParams, public farmEatDb: FarmEatProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private keyboard: Keyboard, private nativePageTransitions: NativePageTransitions, public menuCtrl: MenuController) {
    this.pet = "kittens";
    this.menuCtrl.enable(false, 'myMenu');
    // this.btn = <HTMLInputElement>document.getElementById("btnExcel");
    // this.btn.disabled = true;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    console.log(this.pet);
    //this.check()
    this.btn = <HTMLInputElement>document.getElementById("btnExcel");
    this.btn.disabled = true;

  }

  check() {
    console.log(this.pet);
    this.pass = 0
    this.usrn = 0
    this.mail = 0
    this.btn = <HTMLInputElement>document.getElementById("btnExcel");
    this.btn.disabled = true;
  }
  getEmailLog(email) {
    if (email == "" && this.pass == 1) {
      this.btn.disabled = true;
      this.mail = 0
    } else if (email == "" && this.pass == 0) {
      this.btn.disabled = true;
      this.mail = 0
    } else if (email != "" && this.pass == 1) {
      this.btn.disabled = false;
      this.mail = 1
    }
    else if (email != "" && this.pass == 0) {
      this.btn.disabled = true;
      this.mail = 1
    }
  }

  getPasswordLog(password) {
    if (password == "" && this.mail == 1) {
      this.btn.disabled = true;
      this.pass = 0
    } else if (password == "" && this.mail == 0) {
      this.btn.disabled = true;
      this.pass = 0
    } else if (password != "" && this.mail == 1) {
      this.btn.disabled = false;
      this.pass = 1
    }
    else if (password != "" && this.mail == 0) {
      this.btn.disabled = true;
      this.pass = 1
    }
  }

  getEmail(email) {

    console.log(email, this.usrn, this.pass);

    console.log(email);
    //var element = <HTMLInputElement>document.getElementById("btnExcel");
    if (email == "" && this.usrn == 1 && this.pass == 1) {
      this.btn.disabled = true;
      this.mail = 0
      console.log("disabled = true");
      console.log(this.mail);
    } else if (email == "" && this.usrn == 0 && this.pass == 1) {
      this.mail = 0
      console.log("disabled = true");
      this.btn.disabled = true;
      console.log(this.mail);
    } else if (email == "" && this.usrn == 1 && this.pass == 0) {
      this.mail = 0
      console.log("disabled = true");
      console.log(this.mail);
    } else if (email != "" && this.usrn == 1 && this.pass == 1) {
      this.mail = 1
      console.log("disabled = false");
      this.btn.disabled = false;
      console.log(this.mail);
    } else if (email != "" && this.usrn == 1 && this.pass == 0) {
      this.mail = 1
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.mail);
    } else if (email != "" && this.usrn == 0 && this.pass == 1) {
      this.mail = 1
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.mail);
    } else if (email != "" && this.usrn == 0 && this.pass == 0) {
      this.mail = 1
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.mail);
    } else {
      console.log("disabled = true @ else email");
      this.btn.disabled = true;
    }
  }
  getPassword(password) {
    console.log(password);
    // var element = <HTMLInputElement>document.getElementById("btnExcel");
    console.log(this.mail, this.usrn, password);
    if (password == "" && this.usrn == 1 && this.mail == 1) {
      this.btn.disabled = true;
      this.pass = 0
      console.log("disabled = true");
      console.log(this.pass);
    } else if (password == "" && this.usrn == 0 && this.mail == 1) {
      this.pass = 0
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.pass);
    } else if (password == "" && this.usrn == 1 && this.mail == 0) {
      this.pass = 0
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.pass);
    } else if (password != "" && this.usrn == 1 && this.mail == 1) {
      this.pass = 1
      this.btn.disabled = false;
      console.log("disabled = false");
      console.log(this.pass);
    } else if (password != "" && this.usrn == 1 && this.mail == 0) {
      this.pass = 1
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.pass);
    } else if (password != "" && this.usrn == 0 && this.mail == 1) {
      this.pass = 1
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.pass);
    } else if (password != "" && this.usrn == 0 && this.mail == 0) {
      this.pass = 1
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.pass);
    } else {
      console.log("disabled = true @ else password");
      this.btn.disabled = true;
    }

  }

  getUsername(username) {
    //var element = <HTMLInputElement>document.getElementById("btnExcel");
    //puppies = reg and kittens = log
    console.log(this.mail, username, this.pass);
    if (username == "" && this.pass == 1 && this.mail == 1) {
      this.btn.disabled = true;
      this.usrn = 0
      console.log("disabled = true");
      console.log(this.usrn);
    } else if (username == "" && this.pass == 0 && this.mail == 1) {
      this.usrn = 0
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.usrn);
    } else if (username == "" && this.pass == 1 && this.mail == 0) {
      this.usrn = 0
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.usrn);
    } else if (username != "" && this.pass == 1 && this.mail == 1) {
      this.usrn = 1
      this.btn.disabled = false;
      console.log("disabled = false");
      console.log(this.usrn);
    } else if (username != "" && this.pass == 1 && this.mail == 0) {
      this.usrn = 1
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.usrn);
    } else if (username != "" && this.pass == 0 && this.mail == 1) {
      this.usrn = 1
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.usrn);
    } else if (username != "" && this.pass == 0 && this.mail == 0) {
      this.usrn = 1
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.usrn);
    } else {
      console.log("disabled = true @ else username");
      this.btn.disabled = true;
    }


  }

  Login(email, password) {
    console.log(email);
    console.log(password);


    if (email != "" && password != "") {
      const loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 2000
      });
      loader.present();
      this.farmEatDb.login(email, password).then(() => {
        const loader = this.loadingCtrl.create({
          content: "Logging in please wait...",
          duration: 2000
        });
        loader.present();
        var users = firebase.auth().currentUser;
        console.log(users.uid);

        setTimeout(() => {

          //this.navCtrl.push(HomePage)
          let currentIndex = this.navCtrl.getActive().index;
          this.navCtrl.push(HomePage).then(() => {
            this.navCtrl.remove(currentIndex);
          });
        }, 2000)



      }, (error) => {
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          // title: 'Error!',
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();



      })
    } else {

    }
  }




  forgetPassword() {
    const prompt = this.alertCtrl.create({
      cssClass: "myAlert",
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
                  cssClass: "myAlert",
                  subTitle: "We have sent you email to recover password, Please check your Email",
                  buttons: ['OK']
                });
                alert2.present();
              }).catch((error) => {
                //alert(error.message)

                const alert = this.alertCtrl.create({
                  cssClass: "myAlert",
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
                  cssClass: "myAlert",
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


  Register(username, email, password) {
    console.log(username);
    console.log(password);
    console.log(email);

    if (email != "" && password != "" && username != "") {
      const loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 2000
      });
      loader.present();

      this.farmEatDb.register(email, password, username).then(() => {
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
          cssClass: "myAlert",
          buttons: ['OK']
        });
        alert.present();


      })
    } else {

    }
  }


  changeColor() {
    console.log("V");

    document.getElementById("fullgreen").style.display = "none";
  }

}
