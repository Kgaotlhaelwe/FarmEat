import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FarmEatProvider } from '../providers/farm-eat/farm-eat';
import { HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD

import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
=======
import  {Keyboard} from '@ionic-native/keyboard';

import { RegisterPage } from '../pages/register/register';
import {DescriptionPage} from '../pages/description/description'
import { SearchPage } from '../pages/search/search';
import { NewsfeedPage } from '../pages/newsfeed/newsfeed';

>>>>>>> 118b033962ab4c66eba6e3e8be683e89a4df95f9

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
<<<<<<< HEAD
    RegisterPage, LoginPage
=======
    RegisterPage , 
    DescriptionPage,
    SearchPage,
    NewsfeedPage,
   
    
>>>>>>> 118b033962ab4c66eba6e3e8be683e89a4df95f9
  ],
  imports: [
    BrowserModule,HttpClientModule ,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
<<<<<<< HEAD
    RegisterPage, LoginPage
=======
    RegisterPage, 
    DescriptionPage,
    SearchPage,
    NewsfeedPage,
   
>>>>>>> 118b033962ab4c66eba6e3e8be683e89a4df95f9
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LaunchNavigator,
    Geolocation,
<<<<<<< HEAD
=======
    Keyboard,
>>>>>>> 118b033962ab4c66eba6e3e8be683e89a4df95f9
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FarmEatProvider
  ]
})
export class AppModule {}
