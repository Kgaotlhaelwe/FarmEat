import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FarmEatProvider } from '../providers/farm-eat/farm-eat';
import { HttpClientModule } from '@angular/common/http';
import { Keyboard } from '@ionic-native/keyboard';

import { RegisterPage } from '../pages/register/register';
import {DescriptionPage} from '../pages/description/description'
import { SearchPage } from '../pages/search/search';
import { NewsfeedPage } from '../pages/newsfeed/newsfeed';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage , 
    DescriptionPage,
    SearchPage,
    NewsfeedPage,
   
    
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
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FarmEatProvider
  ]
})
export class AppModule {}
