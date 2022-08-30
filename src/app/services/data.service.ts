import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  private product$ = new BehaviorSubject<any>({});
  selectedProduct$ = this.product$.asObservable();
  private productListBus$ = new BehaviorSubject<any>([]);
  productList$ = this.productListBus$.asObservable();
  constructor() {}

  setProduct(id: any, description: any) {
    this.product$.next({id, description});
  }
  setProductList(products: any) {
    this.productListBus$.next(products);
  }
}