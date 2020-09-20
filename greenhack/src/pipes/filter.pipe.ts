import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "foodfilter", pure: false })
export class FoodFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    return items.filter(item => {
      return item.desc.toLocaleLowerCase().includes(searchText);
    });
  }
}
