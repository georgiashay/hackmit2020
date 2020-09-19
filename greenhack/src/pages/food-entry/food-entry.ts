import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FoodEntry2Page } from '../food-entry2/food-entry2';

@Component({
  selector: 'page-food-entry',
  templateUrl: 'food-entry.html'
})
export class FoodEntryPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  goToFoodEntry2(params){
    if (!params) params = {};
    this.navCtrl.push(FoodEntry2Page);
  }
}
