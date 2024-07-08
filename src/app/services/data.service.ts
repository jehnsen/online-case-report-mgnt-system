import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private isNewValue$ = new BehaviorSubject<any>({});
  isNew$ = this.isNewValue$.asObservable();

  private page$ = new BehaviorSubject<any>({});
  selectedPage$ = this.page$.asObservable();

  private userListBus$ = new BehaviorSubject<any>([]);
  userList$ = this.userListBus$.asObservable();

  private isView$ = new BehaviorSubject<any>({});
  viewValue$ = this.isView$.asObservable();

  private evidence$ = new BehaviorSubject<any>({});
  selectedEvidence$ = this.evidence$.asObservable();
  private evidenceListBus$ = new BehaviorSubject<any>([]);
  evidenceList$ = this.evidenceListBus$.asObservable();

  private case$ = new BehaviorSubject<any>({});
  selectedCase$ = this.case$.asObservable();

  private caseListBus$ = new BehaviorSubject<any>([]);
  caseList$ = this.caseListBus$.asObservable();

  private party$ = new BehaviorSubject<any>({});
  selectedParty$ = this.party$.asObservable();
  private requestingPartiesBus$ = new BehaviorSubject<any>([]);
  requestingParties$ = this.requestingPartiesBus$.asObservable();

  private victim$ = new BehaviorSubject<any>({});
  selectedVictim$ = this.victim$.asObservable();
  
  private victimListBus$ = new BehaviorSubject<any>([]);
  victimList$ = this.victimListBus$.asObservable();

  private suspect$ = new BehaviorSubject<any>({});
  selectedSuspect$ = this.suspect$.asObservable();
  private suspectListBus$ = new BehaviorSubject<any>([]);
  suspectList$ = this.suspectListBus$.asObservable();

  private fileListBus$ = new BehaviorSubject<any>([]);
  fileList$ = this.fileListBus$.asObservable();

  private firearmInventoryListBus$ = new BehaviorSubject<any>([]);
  firearmInventoryList$ = this.firearmInventoryListBus$.asObservable();

  private firearmListBus$ = new BehaviorSubject<any>([]);
  firearmList$ = this.firearmListBus$.asObservable();
  

  private drugTestListBus$ = new BehaviorSubject<any>([]);
  drugTestList$ = this.drugTestListBus$.asObservable();

  private drugRestRecord$ = new BehaviorSubject<any>({});
  selectedDrugRestRecord$ = this.drugRestRecord$.asObservable();

  private firearmDetail$ = new BehaviorSubject<any>({});
  selectedFirearm$ = this.firearmDetail$.asObservable();

  constructor() {}

  setIsNew(value: boolean){
    this.isNewValue$.next(value)
  }

  setSelectedPage(pageTitle: string){
    this.page$.next(pageTitle);
  }

  setUserList(list: any) {
    this.userListBus$.next(list);
  }

  setIsViewValue(value: boolean){
    this.isView$.next(value);
  }

  setEvidence(case_id: any, description: any) {
    this.evidence$.next({case_id, description});
  }
  setEvidenceList(list: any) {
    this.evidenceListBus$.next(list);
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

  setRequestingPartiesList(list: any){
    this.requestingPartiesBus$.next(list);
  }

  setSelectedVictim(name){
    this.victim$.next(name);
  }

  setVictimsList(list: any){
    this.victimListBus$.next(list);
  }

  setSelectedSuspect(name){
    this.suspect$.next(name);
  }

  setSuspectsList(list: any){
    this.suspectListBus$.next(list);
  }

  setFilesList(files: any){
    this.fileListBus$.next(files);
  }

  setFirearmInventoryList(data: any){
    this.firearmInventoryListBus$.next(data);
  }

  setFirearmList(data: any){
    this.firearmListBus$.next(data);
  }

  setDrugTestList(list: any) {
    this.drugTestListBus$.next(list);
  }

  setSelectedDrugRestRecord(data: any){
    this.drugRestRecord$.next(data);
  }

  setSelectedFirearm(data: any) {
    this.firearmDetail$.next(data);
  }

}