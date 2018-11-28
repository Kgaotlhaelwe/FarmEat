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

import { RegisterPage } from '../pages/register/register';
import {DescriptionPage} from '../pages/description/description'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage , DescriptionPage
    
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
    RegisterPage, DescriptionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LaunchNavigator,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FarmEatProvider
  ]
})
export class AppModule {}
