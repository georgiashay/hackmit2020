import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import * as _ from "lodash";
// import { Http, Headers } from "@angular/common/http";

/*
  Generated class for the FoodsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FoodsProvider {
  foods: any;

  constructor(public http: HttpClient) {
    this.foods = null;
  }

  getFoods() {
      if (this.foods) {
        return Promise.resolve(this.foods);
      }

      return new Promise(resolve => {
        this.http.get("http://localhost:8080/api/foods")
        .map(res=>_.values(res))
        .subscribe(foods => {
          this.foods = foods;
          resolve(this.foods);
        })
      })
  }

}
