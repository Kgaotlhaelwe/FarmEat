import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmForumPage } from './farm-forum';

@NgModule({
  declarations: [
    FarmForumPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmForumPage),
  ],
})
export class FarmForumPageModule {}
