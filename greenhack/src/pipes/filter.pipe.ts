import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "foodfilter", pure: false })
export class FoodFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items.map((value, index) => { return { index, value }; });
    }
    searchText = searchText.toLocaleLowerCase();
    return items.reduce((acc, value, index) => {
      return value.desc.toLocaleLowerCase().includes(searchText) ?
      [...acc, { index, value }] : acc;
    }, [])
  }
}
