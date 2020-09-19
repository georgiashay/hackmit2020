import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FoodEntryPage } from '../food-entry/food-entry';

@Component({
  selector: 'page-diary',
  templateUrl: 'diary.html'
})
export class DiaryPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  goToFoodEntry(params){
    if (!params) params = {};
    this.navCtrl.push(FoodEntryPage);
  }
}
