import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FoodEntryPage } from '../food-entry/food-entry';
import { EntriesProvider } from "../../providers/entries/entries";

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
  // entriesService: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public entriesService: EntriesProvider) {
    this.entries = {
      "Breakfast": [],
      "Lunch": [],
      "Dinner": [],
      "Snack": []
    }
  }

  ionViewDidEnter() {
    this.entriesService.getEntries(new Date()).then((entries) => {
      this.entries = entries;
    });
  }

  calculateMeal(meal) {
    return this.entries[meal].reduce((acc, cur) => acc + cur.total_ghg * 2204.62, 0);
  }

  calculateTotal() {
    return this.meals.map(meal => this.calculateMeal(meal.name))
          .reduce((a, b) => a + b, 0);
  }

  goToFoodEntry(meal) {
    this.navCtrl.push(FoodEntryPage, { meal });
  }

  goBackInTime() {

  }

  goForwardInTime() {

  }
}
