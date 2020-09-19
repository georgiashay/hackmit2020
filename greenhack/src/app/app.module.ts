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


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FoodFilterPipe } from "../pipes/filter.pipe";
import { FoodsProvider } from '../providers/foods/foods';

@NgModule({
  declarations: [
    MyApp,
    DiaryPage,
    StatisticsPage,
    HistoryPage,
    TabsControllerPage,
    FoodEntryPage,
    FoodFilterPipe
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
    FoodEntryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FoodsProvider,
  ]
})
export class AppModule {}
