import { Pipe, PipeTransform } from "@angular/core";
import { orderBy } from "lodash";
@Pipe({
    name: "orderBy"
})
export class OrderByPipe implements PipeTransform {
      transform(arr: any, SortBy: string, order?: string): any[] {
          const sortOrder = order ? order : 'asc';
          return orderBy(arr, [SortBy], [sortOrder] as any);
      }
   /*  transform(array: any, field: string): any[] {
        array.sort((a: any, b: any) => {
            if (a[field] < b[field]) {
                return -1;
            } else if (a[field] > b[field]) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    } */
}