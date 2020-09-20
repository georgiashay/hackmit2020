import { HttpClient, HttpParams } from '@angular/common/http';
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

    return [year, month, day].join("/");
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
      this.http.get("http://localhost:8080/api/getEntries", { params })
      .map(res=>_.values(res))
      .subscribe(entries => {
        this.addEntries(entries);
        resolve(entries[this.getDateString(date)]);
      });
    });
  }
}
