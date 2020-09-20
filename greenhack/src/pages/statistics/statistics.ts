import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EntriesProvider } from "../../providers/entries/entries";
import { Chart } from "chart.js";

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html'
})
export class StatisticsPage {
  @ViewChild("barCanvas") barCanvas: ElementRef;

  daily_stats: any;
  dates: any = [];
  contributors: any = [];
  biggest_contributors: any = [];
  meals: any = [
    {
      name: "Breakfast",
      icon: "cafe"
    },
    {
      name: "Lunch",
      icon: "pizza"
    },
    {
      name: "Dinner",
      icon: "restaurant"
    },
    {
      name: "Snack",
      icon: "ice-cream"
    }
  ];
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public entriesService: EntriesProvider) {
  }

  ionViewDidEnter() {
    this.daily_stats = { "Breakfast": [], "Lunch": [], "Dinner": [], "Snack": [] };
    this.dates = [];
    this.contributors = [];
    this.biggest_contributors = [];
    var today = new Date();
    var minDate = new Date(today.getTime());
    minDate.setDate(minDate.getDate() - 13);
    this.entriesService.getEntriesRange(minDate, today)
    .then((results) => {
      Object.keys(results)
      .sort((a, b) => +new Date(a) - +new Date(b))
      .forEach((date) => {
        this.dates.push(date);
        this.meals.forEach((meal) => {
          this.daily_stats[meal.name].push(this.calculateMeal(results[date], meal.name));
        });
      });

      var contributors = {};

      Object.keys(results).forEach((date) => {
        this.meals.forEach((meal) => {
          results[date][meal.name].forEach((food) => {
            if (contributors[food.food_name] !== undefined) {
              contributors[food.food_name] += food.total_ghg;
            } else {
              contributors[food.food_name] = food.total_ghg;
            }
          });
        });
      });

      var total_ghg = Object.keys(contributors).reduce((sum, contributor) => sum + contributors[contributor], 0);

      Object.keys(contributors).forEach((contributor) => this.contributors.push(
        {
          contributor: contributor,
          percentage_decimal: contributors[contributor] / total_ghg
        }
      ));

      this.contributors.sort((a, b) => b.percentage_decimal - a.percentage_decimal);

      var cumulative_percent = 0;
      var i = 0;
      while (this.biggest_contributors.length < Math.min(5, Object.keys(this.contributors).length) && cumulative_percent < 0.8) {
        this.biggest_contributors.push(Object.assign({}, this.contributors[i], { percentage: (this.contributors[i].percentage_decimal * 100).toFixed(1) }));
        cumulative_percent += this.contributors[i].percentage_decimal;
        i++;
      }

      new Chart(this.barCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: this.dates,
          datasets: [
            {
              label: "Breakfast",
              data: this.daily_stats["Breakfast"],
              backgroundColor: "#4287f5"
            },
            {
              label: "Lunch",
              data: this.daily_stats["Lunch"],
              backgroundColor: "#f5ce42"
            },
            {
              label: "Dinner",
              data: this.daily_stats["Dinner"],
              backgroundColor: "#f54e42"
            },
            {
              label: "Snack",
              data: this.daily_stats["Snack"],
              backgroundColor: "#42f55a"
            }
          ]
        },
        options: {
          scales: {
            xAxes: [{stacked: true}],
            yAxes: [{stacked: true}]
          }
        }
      })
    });
  }

  private calculateMeal(obj, meal) {
    return obj[meal].reduce((acc, cur) => acc + cur.total_ghg * 2204.62, 0);
  }

}
