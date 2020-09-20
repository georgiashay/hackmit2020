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
  // entriesService: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public entriesService: EntriesProvider) {
    // this.entriesService = _entriesService;
  }

  ionViewDidEnter() {
    this.entriesService.getEntries(new Date()).then((entries) => {
      this.entries = entries;
      console.log(this.entries);
    });
  }

  goToFoodEntry(meal) {
    this.navCtrl.push(FoodEntryPage, { meal });
  }

  goBackInTime() {

  }

  goForwardInTime() {

  }
}
