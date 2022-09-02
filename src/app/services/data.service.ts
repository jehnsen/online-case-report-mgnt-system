import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private isView$ = new BehaviorSubject<any>({});
  viewValue$ = this.isView$.asObservable();

  private product$ = new BehaviorSubject<any>({});
  selectedProduct$ = this.product$.asObservable();
  private productListBus$ = new BehaviorSubject<any>([]);
  productList$ = this.productListBus$.asObservable();

  private case$ = new BehaviorSubject<any>({});
  selectedCase$ = this.case$.asObservable();

  private caseListBus$ = new BehaviorSubject<any>([]);
  caseList$ = this.caseListBus$.asObservable();

  private party$ = new BehaviorSubject<any>({});
  selectedParty$ = this.party$.asObservable();

  private victim$ = new BehaviorSubject<any>({});
  selectedVictim$ = this.victim$.asObservable();

  private suspect$ = new BehaviorSubject<any>({});
  selectedSuspect$ = this.suspect$.asObservable();

  private fileListBus$ = new BehaviorSubject<any>([]);
  fileList$ = this.fileListBus$.asObservable();

  constructor() {}

  setIsViewValue(value: boolean){
    this.isView$.next(value);
  }

  setProduct(id: any, description: any) {
    this.product$.next({id, description});
  }
  setProductList(products: any) {
    this.productListBus$.next(products);
  }

  setCase(caseObject: any) {
    this.case$.next(caseObject);
  }
  setCaseList(cases: any){
    this.caseListBus$.next(cases);
  }

  setSelectedParty(party){
    this.party$.next(party);
  }

  setSelectedVictim(name){
    this.victim$.next(name);
  }

  setSelectedSuspect(name){
    this.suspect$.next(name);
  }

  setFilesList(files: any){
    this.fileListBus$.next(files);
  }

}