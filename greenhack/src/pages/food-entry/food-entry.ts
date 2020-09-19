import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FoodsProvider } from "../../providers/foods/foods";

@Component({
  selector: 'page-food-entry',
  templateUrl: 'food-entry.html'
})
export class FoodEntryPage {
  public items: any;
  public searchText: string;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public foodService: FoodsProvider) {
    foodService.getFoods().then((foods) => {
      this.items = foods;
    });
  }

  addFood(i) {
    console.log(i);
  }

}
