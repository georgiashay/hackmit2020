import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DiaryPage } from "../diary/diary";
import { EntriesProvider } from "../../providers/entries/entries";

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
  meal: string;
<<<<<<< HEAD
  unit: string;
=======
  date: Date;
>>>>>>> 9b63105316eeaad25c166cf3b6faf607eeff331e

  constructor(public navCtrl: NavController, public navParams: NavParams, public entriesService: EntriesProvider) {
    this.item = this.navParams.get("item");
    this.meal = this.navParams.get("meal");
    this.date = this.navParams.get("date");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFoodPage');
  }

  
  addFood() {
    console.log(this.units)
    var grams = this.units == "grams" ? this.grams : (this.grams * this.item.grams_unit),
    this.entriesService.addEntry({
      food_id: this.item._id,
      food_name: this.item.desc,
      food_rating: this.item.rating,
      total_ced: this.item.ced !== undefined ? (this.grams * this.item.ced)/1000 : undefined,
      total_ghg: this.item.ghg !== undefined ? (grams * this.item.ghg)/1000 : undefined,
      meal: this.meal,
      date: this.date
    });
    this.navCtrl.setRoot(DiaryPage, { diaryDate: this.date });
    this.navCtrl.popToRoot();
  }
}
