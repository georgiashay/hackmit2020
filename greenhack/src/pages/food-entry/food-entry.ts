import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FoodsProvider } from "../../providers/foods/foods";
import { AddFoodPage } from "../add-food/add-food";

@Component({
  selector: 'page-food-entry',
  templateUrl: 'food-entry.html'
})
export class FoodEntryPage {
  public items: any;
  public searchText: string;
  public meal: string;
  public date: Date;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public navParams: NavParams, public foodService: FoodsProvider) {
    this.meal = this.navParams.get("meal");
    this.date = this.navParams.get("date");
    foodService.getFoods().then((foods) => {
      this.items = foods;
    });
  }

  addFood(i) {
    this.navCtrl.push(AddFoodPage, { item: this.items[i], meal: this.meal, date: this.date });
  }

}
