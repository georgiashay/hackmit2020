import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { HttpClientModule } from "@angular/common/http";

import { MyApp } from './app.component';
import { DiaryPage } from '../pages/diary/diary';
import { StatisticsPage } from '../pages/statistics/statistics';
import { HistoryPage } from '../pages/history/history';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { FoodEntryPage } from '../pages/food-entry/food-entry';
import { AddFoodPage } from '../pages/add-food/add-food';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FoodFilterPipe } from "../pipes/filter.pipe";
import { FoodsProvider } from '../providers/foods/foods';
import { EntriesProvider } from '../providers/entries/entries';

@NgModule({
  declarations: [
    MyApp,
    DiaryPage,
    StatisticsPage,
    HistoryPage,
    TabsControllerPage,
    FoodEntryPage,
    FoodFilterPipe,
    AddFoodPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DiaryPage,
    StatisticsPage,
    HistoryPage,
    TabsControllerPage,
    FoodEntryPage,
    AddFoodPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FoodsProvider,
    EntriesProvider,
  ]
})
export class AppModule {}
