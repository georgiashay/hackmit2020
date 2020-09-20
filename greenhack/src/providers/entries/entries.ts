import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import * as _ from "lodash";

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

  private addEntries(entries) {
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      entry.date = new Date(entry.date);
      var date = this.stripTime(entry.date);
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

  getEntries(date: Date) {
    if (this.entries[date]) {
      return this.entries[date];
    }

    var newDate = this.stripTime(date);
    var nextDate = new Date(newDate.getTime());
    nextDate.setDate(newDate.getDate() + 1);

    var params = {
      minDate: newDate,
      maxDate: nextDate
    }

    return new Promise(resolve => {
      this.http.get("http://localhost:8080/api/getEntries", { params })
      .map(res=>_.values(res))
      .subscribe(entries => {
        this.addEntries(entries);
        resolve(entries[newDate]);
      });
    });
  }
}
