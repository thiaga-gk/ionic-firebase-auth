import {Injectable} from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  lists: any = [
    {
      itemName: 'Milk',
      checked: false
    },
    {
      itemName: 'Cheese',
      checked: true
    },
    {
      itemName: 'Bread',
      checked: false
    }
  ];

  constructor() {
    console.log('Hello DataProvider Provider');
  }

}
