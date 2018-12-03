import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFarmPage } from './add-farm';

@NgModule({
  declarations: [
    AddFarmPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFarmPage),
  ],
})
export class AddFarmPageModule {}
