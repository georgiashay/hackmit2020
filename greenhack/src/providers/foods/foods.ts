import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import * as _ from "lodash";
import { FOOD_SERVER } from "../../constants";
// import { Http, Headers } from "@angular/common/http";

/*
  Generated class for the FoodsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FoodsProvider {
  foods: any;
  statistics: any;

  constructor(public http: HttpClient) {
    this.foods = null;
    this.statistics = null;
  }

  private filterOutliers() {
    var values = this.foods.map((food) => food.ghg);
    values.sort((a, b) => a - b);
    var q1 = values[Math.floor((values.length / 4))];
    var q3 = values[Math.ceil((values.length * (3/4)))];
    var iqr = q3 - q1;
    var maxValue = q3 + iqr * 1.5;
    var minValue = q1 - iqr * 1.5;

    return this.foods.filter((food) => {
      return (food.ghg <= maxValue) && (food.ghg >= minValue);
    });
  }

  private calculateStatistics() {
    var filteredFoods = this.filterOutliers();
    var sum = filteredFoods.reduce((sum, food) => sum + food.ghg, 0);
    var avg = sum/filteredFoods.length;
    var squareDiffs = filteredFoods.map((food) => {
      var diff = food.ghg - avg;
      return diff * diff;
    });
    var averageSquareDiff = squareDiffs.reduce((d1, d2) => d1 + d2, 0)/squareDiffs.length;
    var stdDev = Math.sqrt(averageSquareDiff);
    this.statistics = {
      average: avg,
      stdDev: stdDev
    }
  }

  private assignRating(food) {
    var numStdDevs = (food.ghg - this.statistics.average)/this.statistics.stdDev;
    if (numStdDevs > 1.5) {
      food.rating = "F";
    } else if (numStdDevs > 0.5) {
      food.rating = "D";
    } else if (numStdDevs > -0.5) {
      food.rating = "C";
    } else if (numStdDevs > -0.75) {
      food.rating = "B";
    } else {
      food.rating = "A";
    }
  }

  getFoods() {
    if (this.foods) {
      return Promise.resolve(this.foods);
    }

    return new Promise(resolve => {
      this.http.get(`${FOOD_SERVER}/api/foods`)
      .map(res=>_.values(res))
      .subscribe(foods => {
        this.foods = foods;
        this.calculateStatistics();
        this.foods.forEach((food) => this.assignRating(food));
        console.log(this.foods.filter((food) => food.rating == "A").length);
        console.log(this.foods.filter((food) => food.rating == "B").length);
        console.log(this.foods.filter((food) => food.rating == "C").length);
        console.log(this.foods.filter((food) => food.rating == "D").length);
        console.log(this.foods.filter((food) => food.rating == "F").length);
        console.log(Math.max(...this.foods.map((food) => food.ghg)));
        resolve(this.foods);
      })
    })
  }

  getStatistics() {
    if (this.statistics) {
      return this.statistics;
    } else {
      return new Promise(resolve => {
        this.getFoods().then(() => {
          resolve(this.statistics);
        });
      });
    }
  }

  ratingColor(rating) {
    if (rating == "A") return "#18ab1f";
    if (rating == "B") return "#7cab18";
    if (rating == "C") return "#aba618";
    if (rating == "D") return "#ab5f18";
    if (rating == "F") return "#ab1d18";
  }

}
