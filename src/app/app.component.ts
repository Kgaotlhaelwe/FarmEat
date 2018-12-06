import { Component, ViewChild} from '@angular/core';
import { Nav, Platform, App, Events   } from 'ionic-angular';
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
import { ProfilePage } from '../pages/profile/profile';
declare var firebase
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  pages2: any
  rootPage: any;

  pages: Array<{ title: string, component: any, icon?: string }>;
  username;
  email;
  proPic;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public farmEatDb: FarmEatProvider, public appCtrl: App, public events: Events) {
    this.initializeApp();
    var id;
    events.subscribe('user:created', (user, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      id = user
      alert(user)
      console.log('Welcome', user, 'at', time);
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
    });
    farmEatDb.checkstate().then((data: any) => {

      if (data == 1) {
        this.rootPage = HomePage;
        //getting user info
        let userID = firebase.auth().currentUser.uid
        
        console.log(userID);
        // this.farmEatDb.getUID().then((data)=>{
        //   id = data;
        //   console.log(id);
         
        // })
    //checkstate
        
        // this.farmEatDb.getUser().then((data: any) => {
        //   console.log(data);

        //   this.username = data.username
        //   this.email = data.email
        //   this.proPic = data.proPicture 
        // })
      }
      else {
        this.rootPage = LoginPage;
      }
    })


    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'News Feeds', component: NewsfeedPage, icon: 'md-paper' },
      { title: 'Farms Farum', component: FarmForumPage, icon: 'ios-people' },
      { title: 'Add Farm', component: AddFarmPage, icon: 'ios-add' },
      { title: 'Profile', component: ProfilePage, icon: 'ios-profile' },
      { title: 'Logout', component: null, icon: 'md-log-out' },


    ];
    this.pages2 = {
      homePage: HomePage,
      newsfeedPage: NewsfeedPage,
      farmForumPage: FarmForumPage,
      addFarm: AddFarmPage,
      profile: ProfilePage,
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
    if (page.component) {
      this.nav.setRoot(page.component);
    } else if (page.component == null) {
      firebase.auth().signOut()
      this.nav.setRoot(LoginPage);
    }
  }
  signOut() {
    this.farmEatDb.signout().then(() => {
      this.nav.setRoot(LoginPage);
     
    })

  }

  goHome() {
    //this.nav.popTo(HomePage);
    this.nav.popTo(HomePage)
  }

  goProfile() {
    this.nav.setRoot(ProfilePage)
  }
}
