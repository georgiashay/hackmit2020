import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EntriesProvider } from "../../providers/entries/entries";
import { DiaryPage } from "../../pages/diary/diary";

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {
  history: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public entriesService: EntriesProvider) {
    this.history = [];
  }

  ionViewDidEnter() {
    this.entriesService.getAllEntries().then((entries) => {
      this.history = [];
      Object.keys(entries).forEach((date) => {
        this.history.push({
          date: date,
          ghg: Object.keys(entries[date]).map((meal) => {
            return entries[date][meal].reduce((sum, food) => sum + food.total_ghg, 0);
          }).reduce((sum, a) => sum + a, 0) * 2.20462
        });
      });
      console.log(this.history);
    });
  }

  goToDayEntry(date) {
    this.navCtrl.push(DiaryPage, { diaryDate: new Date(date) });
  }

}
