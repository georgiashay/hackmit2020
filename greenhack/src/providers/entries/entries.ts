import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import * as _ from "lodash";
import { FOOD_SERVER } from "../../constants";

/*
  Generated class for the EntriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EntriesProvider {
  entries: any;

  constructor(public http: HttpClient) {
    this.entries = {};
  }

  private saveEntries(entries) {
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      entry.date = new Date(entry.date);
      var date = this.getDateString(entry.date);
      if (this.entries[date] === undefined) {
        this.entries[date] = {
          "Breakfast": [],
          "Lunch": [],
          "Dinner": [],
          "Snack": []
        }
      }
      var index = this.entries[date][entry.meal]
      .map((e) => e._id)
      .indexOf(entry._id);

      if (index >= 0) {
        this.entries[date][entry.meal][index] = entry;
      } else {
        this.entries[date][entry.meal].push(entry);
      }
    }
  }

  private stripTime(date: Date) {
    var newDate = new Date(date.getTime());
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }

  public getDateString(d: Date) {
    var month = "" + (d.getMonth() + 1);
    var day = "" + d.getDate();
    var year = d.getFullYear();

    if (month.length < 2)
        month = "0" + month;
    if (day.length < 2)
        day = "0" + day;

    return [month, day, year].join("/");
  }

  getEntries(date: Date) {
    var existingEntry = this.entries[this.getDateString(date)];

    if (existingEntry) {
      return Promise.resolve(existingEntry);
    }

    var newDate = this.stripTime(date);
    var nextDate = new Date(newDate.getTime());
    nextDate.setDate(newDate.getDate() + 1);

    var params = new HttpParams();
    params = params.append("minDate", newDate.toISOString());
    params = params.append("maxDate", nextDate.toISOString());

    return new Promise(resolve => {
      this.http.get(`${FOOD_SERVER}/api/getEntries`, { params })
      .map(res=>_.values(res))
      .subscribe(entries => {
        this.saveEntries(entries);
        var dateEntries = this.entries[this.getDateString(date)];
        if (dateEntries) {
          resolve(dateEntries);
        } else {
          var blankEntry = {
            "Breakfast": [],
            "Lunch": [],
            "Dinner": [],
            "Snack": []
          };
          this.entries[this.getDateString(date)] = blankEntry;
          resolve(this.entries[this.getDateString(date)]);
        }
      });
    });
  }

  private getDateArray(minDate, maxDate) {
    var dateArray = [];
    var currentDate = new Date(minDate.getTime());
    while (currentDate <= maxDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray.map((date) => this.getDateString(date));
  }

  getEntriesRange(_minDate: Date, _maxDate: Date) {
    var minDate = this.stripTime(_minDate);
    var maxDate = this.stripTime(_maxDate);
    var maxDateEnd = new Date(maxDate.getTime());
    maxDateEnd.setDate(maxDateEnd.getDate() + 1);

    var params = new HttpParams();
    params = params.append("minDate", minDate.toISOString());
    params = params.append("maxDate", maxDateEnd.toISOString());
    console.log(params);
    return new Promise(resolve => {
      this.http.get(`${FOOD_SERVER}/api/getEntries`, { params })
      .map(res=>_.values(res))
      .subscribe(entries => {
        this.saveEntries(entries);
        var datesInRange = this.getDateArray(minDate, maxDate);
        var rangeEntries = {};
        datesInRange.forEach((date) => rangeEntries[date] = this.entries[date] ||
            { "Breakfast": [], "Lunch": [], "Dinner": [], "Snack": [] });
        resolve(rangeEntries);
      })
    })
  }

  getAllEntries() {
    return new Promise(resolve => {
      this.http.get(`${FOOD_SERVER}/api/getEntries`)
      .map(res=>_.values(res))
      .subscribe(entries => {
        this.saveEntries(entries);
        resolve(this.entries);
      });
    });
  }

  addEntry(newEntry: any) {
    return new Promise(resolve => {
      this.http.post(`${FOOD_SERVER}/api/addEntry`, newEntry)
      .subscribe(entry => {
        this.saveEntries([entry]);
        resolve(entry);
      });
    });
  }

  private flushEntry(id: String) {
    Object.keys(this.entries).forEach((date) => {
      Object.keys(this.entries[date]).forEach((meal) => {
        var index = this.entries[date][meal].map((food) => food._id).indexOf(id);
        if (index !== -1) {
          this.entries[date][meal].splice(index, 1);
          return;
        }
      });
    })
  }

  removeEntry(id: String) {
    return new Promise(resolve => {
      this.http.post(`${FOOD_SERVER}/api/removeEntry`, { id })
      .subscribe(response => {
        this.flushEntry(id);
      })
    })
  }
}
