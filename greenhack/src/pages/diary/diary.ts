import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FoodEntryPage } from '../food-entry/food-entry';
import { EntriesProvider } from "../../providers/entries/entries";
import { FoodsProvider } from "../../providers/foods/foods";
import * as moment from "moment";

@Component({
  selector: 'page-diary',
  templateUrl: 'diary.html'
})
export class DiaryPage {
  entries: any;
  meals: any = [
    {
      name: "Breakfast",
      icon: "cafe"
    },
    {
      name: "Lunch",
      icon: "pizza"
    },
    {
      name: "Dinner",
      icon: "restaurant"
    },
    {
      name: "Snack",
      icon: "ice-cream"
    }
  ];
  date: Date = new Date();
  // entriesService: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public navParams: NavParams, public entriesService: EntriesProvider, public foodService: FoodsProvider) {
    this.date = this.navParams.get("diaryDate");
    if (this.date === undefined) {
      this.date = new Date();
    }
    this.entries = {
      "Breakfast": [],
      "Lunch": [],
      "Dinner": [],
      "Snack": []
    }
  }

  reloadEntries() {
    this.entriesService.getEntries(this.date).then((entries) => {
      this.entries = entries;
    });
  }

  ionViewDidEnter() {
    this.reloadEntries();
  }

  calculateMeal(meal) {
    return this.entries[meal].reduce((acc, cur) => acc + cur.total_ghg * 2.20462, 0);
  }

  calculateTotal() {
    return this.meals.map(meal => this.calculateMeal(meal.name))
          .reduce((a, b) => a + b, 0);
  }

  goToFoodEntry(meal) {
    this.navCtrl.push(FoodEntryPage, { meal: meal, date: new Date(this.date) });
  }

  goBackInTime() {
    this.date.setDate(this.date.getDate() - 1);
    this.reloadEntries();
  }

  goForwardInTime() {
    this.date.setDate(this.date.getDate() + 1);
    this.reloadEntries();
  }

  formatDate() {
    return moment(this.date).calendar(null,
    {
      sameDay: "[Today] M/D/YYYY",
      nextDay: "[Tomorrow] M/D/YYYY",
      nextWeek: "dddd M/D/YYYY",
      lastDay: "[Yesterday] M/D/YYYY",
      lastWeek: "[Last] dddd M/D/YYYY",
      sameElse: "M/D/YYYY"
    });
  }

}
