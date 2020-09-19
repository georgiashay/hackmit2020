import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-food-entry',
  templateUrl: 'food-entry.html'
})
export class FoodEntryPage {
  public items: any;
  public searchText: string;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
    this.items = [{
      "_id":"5f665d12160a490456c47c88",
      "name":"carrot",
      "ced":1.326,
      "ghg":0.092
    },{
      "_id":"5f665ddf160a490456c47c89",
      "name":"Beef, meat",
      "ced":67.895,
      "ghg":33.105}];
  }

  addFood(i) {
    console.log(i);
  }

}
