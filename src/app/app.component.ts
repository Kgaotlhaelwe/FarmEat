import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FarmEatProvider } from '../providers/farm-eat/farm-eat';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register';
import { NewsfeedPage } from '../pages/newsfeed/newsfeed';
import { FarmForumPage } from '../pages/farm-forum/farm-forum'
import { LoginPage } from '../pages/login/login';
import { DescriptionPage } from '../pages/description/description';
import { AddFarmPage } from '../pages/add-farm/add-farm';
import { ProfilePage } from '../pages/profile/profile'
declare var firebase
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  pages2: any
  rootPage: any

  username;
  email;
  proPic;
  uid;

  pages: Array<{ title: string, component: any, icon?: string }>;

  constructor(public platform: Platform, public events: Events, public statusBar: StatusBar, public splashScreen: SplashScreen, public farmEatDb: FarmEatProvider,public alertCtrl: AlertController) {
    this.initializeApp();

    //checkstate

    farmEatDb.checkstate().then((data: any) => {

      if (data == 1) {

        this.rootPage = HomePage;
        // this.nav.insert(0, HomePage)
        // var views =  this.nav.getViews()
        // var view = this.nav.getActive()
        // console.log(views);
        // console.log(view);

      }
      else {
        this.rootPage = LoginPage;
        console.log('login');

        
      }
    })



    events.subscribe('user:created', (user, time) => {
      var id = user
      this.uid = user

      console.log(this.uid);
      console.log(id);
      
      firebase.database().ref('user/' + id).on('value', (data: any) => {
        var user = data.val();
        console.log(user);
        this.username = user.username
        this.email = user.email
        this.proPic = user.proPicture
        
        console.log(this.username);
        console.log(this.email);
        console.log(this.proPic);
      })
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome', user, 'at', time);
    });



    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'News Feeds', component: NewsfeedPage, icon: 'md-paper' },
      { title: 'Farms Farum', component: FarmForumPage, icon: 'ios-people' },
      { title: 'Profile', component: ProfilePage, icon: 'ios-add' },

      { title: 'Logout', component: null, icon: 'md-log-out' },


    ];
    this.pages2 = {
      homePage: HomePage,
      newsfeedPage: NewsfeedPage,
      farmForumPage: FarmForumPage,
      ProfilePage,
      logout: null

    }
  }

  // ionViewWillEnter(){
  //   console.log("app component");
  //   //returns view controller obj 
  //   let view = this.nav.getActive();

  //   //prints out component name as string
  //   console.log(view.component.name);
  //   console.log("view.component.name");
  // }

  // ionViewDidEnter(){
  //   console.log("app component");
  //   //returns view controller obj 
  //   let view = this.nav.getActive();

  //   //prints out component name as string
  //   console.log(view.component.name);
  //   console.log("view.component.name");
  // }


  // ionViewDidLoad() {
  //   console.log("app component");
  //   //returns view controller obj 
  //   let view = this.nav.getActive();

  //   //prints out component name as string
  //   console.log(view.component.name);
  //   console.log("view.component.name");
  // }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  //   if(page.component){
  //     this.nav.setRoot(page.component);
  //   }else if(page.component == null){
  //     firebase.auth().signOut()
  //     this.nav.setRoot(LoginPage);
  //   }
  // }


  signOut() {
    this.farmEatDb.signout().then(() => {
      this.nav.push(LoginPage);
    })

  }

  request(){
    console.log(this.uid);
    
    firebase.database().ref('CreateFarmRequest/'+this.uid).set({
      email: this.email,
    })
    const alert = this.alertCtrl.create({
      title: 'Email sent',
      cssClass: "myAlert",
      subTitle: 'Please check you email for the link to our add farm website',
      buttons: ['OK']
    });
    alert.present();
  }

  goHome() {

    //  this.nav.insert(0, HomePage)

          var views =  this.nav.getViews()
    console.log(views);

        var views =  this.nav.getViews()
        var view = this.nav.getActive()
        console.log(views);
        console.log(view);

        this.nav.setPages([views[0]])

        indexArr[0] = 1

    //     this.rootPage = HomePage

    // this.nav.popToRoot()

    // this.nav.pop()
  }


}

var indexArr = []

export default indexArr
