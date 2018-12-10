import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {FarmEatProvider} from '../providers/farm-eat/farm-eat';
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
  pages2:any
  rootPage: any 

  username;
  email;
  proPic;

  pages: Array<{title: string, component: any,icon?:string}>;

  constructor(public platform: Platform, public events: Events, public statusBar: StatusBar, public splashScreen: SplashScreen, public farmEatDb: FarmEatProvider) {
    this.initializeApp();

    events.subscribe('user:created', (user, time) => {
      var id = user

      firebase.database().ref('user/'+id).on('value' , (data:any)=>{
        var user =data.val();
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

    //checkstate

    farmEatDb.checkstate().then((data:any)=>{

      if (data ==1){
        this.rootPage = HomePage;
     
      }
      else {
        this.rootPage = LoginPage;
      }
     })

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon:'home'  },
      { title: 'News Feeds', component: NewsfeedPage, icon:'md-paper'  },
      { title: 'Farms Farum', component: FarmForumPage,icon:'ios-people' },
      { title: 'Add Farm', component: AddFarmPage,icon:'ios-add' },

      { title: 'Logout', component: null , icon:'md-log-out' },
     
    
    ];
    this.pages2 = {
      homePage: HomePage,
      newsfeedPage: NewsfeedPage,
      farmForumPage: FarmForumPage,
      addFarm:AddFarmPage,
      logout: null
  
    }
  }
 
  
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    if(page.component){
      this.nav.setRoot(page.component);
    }else if(page.component == null){
      firebase.auth().signOut()
      this.nav.setRoot(LoginPage);
    }
  }
  signOut(){
    this.farmEatDb.signout().then(()=>{
      this.nav.setRoot(LoginPage);
    })
    
  }

  goHome(){
    //this.nav.popTo(HomePage);
    this.nav.popTo(HomePage)
  }

  goProfile(){
    this.nav.setRoot(ProfilePage)
  }
}
