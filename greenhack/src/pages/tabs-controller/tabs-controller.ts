import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DiaryPage } from '../diary/diary';
import { StatisticsPage } from '../statistics/statistics';
import { HistoryPage } from '../history/history';
// import { AddFoodPage } from "../add-food/add-food";

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = DiaryPage;
  // tab1Root: any = AddFoodPage;
  tab2Root: any = StatisticsPage;
  tab3Root: any = HistoryPage;
  constructor(public navCtrl: NavController) {
  }

}
