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
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public entriesService: EntriesProvider) {
    entriesService.getEntries(new Date()).then((entries) => {
      this.entries = entries;
    })
  }

  goToFoodEntry(params){
    if (!params) params = {};
    this.navCtrl.push(FoodEntryPage);
  }

  goBackInTime() {

  }

  goForwardInTime() {

  }
}
