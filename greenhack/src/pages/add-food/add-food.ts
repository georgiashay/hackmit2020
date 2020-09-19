import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DiaryPage } from "../diary/diary";
/**
 * Generated class for the AddFoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-food',
  templateUrl: 'add-food.html',
})
export class AddFoodPage {

  item: any;
  grams: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get("item");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFoodPage');
  }

  addFood() {
    // Todo add food to db
    this.navCtrl.setRoot(DiaryPage);
    this.navCtrl.popToRoot();
  }
}
