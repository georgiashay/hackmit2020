import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FoodEntryPage } from '../pages/food-entry/food-entry';
import { StatisticsPage } from '../pages/statistics/statistics';
import { HistoryPage } from '../pages/history/history';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { FoodEntry2Page } from '../pages/food-entry2/food-entry2';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    FoodEntryPage,
    StatisticsPage,
    HistoryPage,
    TabsControllerPage,
    FoodEntry2Page
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FoodEntryPage,
    StatisticsPage,
    HistoryPage,
    TabsControllerPage,
    FoodEntry2Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}