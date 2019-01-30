import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FarmEatProvider } from '../providers/farm-eat/farm-eat';
import { HttpClientModule } from '@angular/common/http';
import  {Keyboard} from '@ionic-native/keyboard';

import { RegisterPage } from '../pages/register/register';
import {DescriptionPage} from '../pages/description/description'
import { SearchPage } from '../pages/search/search';
import { NewsfeedPage } from '../pages/newsfeed/newsfeed';
import { FarmForumPage } from '../pages/farm-forum/farm-forum'
import { LoginPage } from '../pages/login/login';
import { AddFarmPage } from '../pages/add-farm/add-farm';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { ProfilePage } from '../pages/profile/profile';
import { MoreinforPage } from '../pages/moreinfor/moreinfor';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage, 
    LoginPage,
    DescriptionPage,
    SearchPage,
    NewsfeedPage,
    LoginPage,
    FarmForumPage,
    AddFarmPage,
    ProfilePage,
    MoreinforPage
    
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
    RegisterPage, 
    DescriptionPage,
    SearchPage,
    NewsfeedPage,
    FarmForumPage,
    LoginPage,
    AddFarmPage,
    ProfilePage,
    MoreinforPage
    
   
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LaunchNavigator,
    CallNumber,
    SocialSharing, 
    Geolocation,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FarmEatProvider,
    NativePageTransitions,
  ]
})
export class AppModule {}
