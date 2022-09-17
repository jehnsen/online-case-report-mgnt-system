import { Component, ViewChild ,OnInit, ChangeDetectorRef, AfterContentChecked  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router  } from '@angular/router'
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CaseService } from '../../services/case.service';
import { FileService } from '../../services/file.service';
import { CategoryService } from '../../services/category.service';
import { DispositionService } from '../../services/disposition.service';
import { EvidenceListComponent } from '../evidence-list/evidence-list.component';
import { DataService } from '../../services/data.service';
import { Time24to12Format } from '../../pipes/time24to12.pipe';
import { Utils } from '../../helpers/utils';

@Component({
  selector: 'app-case-entry',
  templateUrl: './case-entry.component.html',
  styleUrls: ['./case-entry.component.css'],
  providers: [ Time24to12Format ]
})

export class CaseEntryComponent implements OnInit {

  incidentData: FormGroup;

  incidentDescription: string = '';
  model: NgbDateStruct;
  date: string;
  
  isAdd: boolean = true;
  isLoading: boolean;
  evidences: any = [];
  categories: any =[];
  files: any = [];
  dispositions: any = [];
  selectedEvidence: any;
  caseId: number;
  selectedIncident: any;

  caseNumber: any;
  existingRecord: any;
  selectedCategory: any;
  userDivision: string;
  userData: any;

  @ViewChild('dp') dp: NgbDatepicker;
  @ViewChild(EvidenceListComponent) evidenceList: any;

  constructor(
    private fb: FormBuilder,
    private caseService: CaseService, 
    private fileService: FileService,
    private categoryService: CategoryService,
    private dispositionService: DispositionService,
    private toastrService: ToastrService, 
    private calendar: NgbCalendar, 
    private dataService: DataService,
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private timeConverterPipe: Time24to12Format
  ) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.caseId = +params.get('id');
      console.log(`activated route: ${this.caseId}`);
    })

    this.userData = JSON.parse(window.sessionStorage.getItem('auth-user')).user;
    this.userDivision = this.userData.division;
    if(this.userData.usertype !== 'Encoder'){
      this.router.navigate(['/main/records']);
    }
    this.dataService.setIsViewValue(false);

    // initialize form group
    this.clearFields();

    this.dataService.selectedEvidence$.subscribe((value) => {
      // this.selectedEvidence = value;
      if(Object.keys(value).length > 0){
        this.evidences.push(value)
      }

    });
    this.dataService.setEvidenceList(this.evidences);

    // set the requesting party field
    this.dataService.selectedParty$.subscribe((party) => {
      if(Object.keys(party).length > 0)
        this.incidentData.patchValue({ 'requestingParty': party })
    })
    // set the victim field
    this.dataService.selectedVictim$.subscribe((victim) => {
      if(Object.keys(victim).length > 0)
        this.incidentData.patchValue({'victimName': victim})
    })
    // set the suspect field
    this.dataService.selectedSuspect$.subscribe((suspect) => {
      if(Object.keys(suspect).length > 0) 
        this.incidentData.patchValue({'suspectName': suspect})
    })
    
    this.dataService.selectedCase$.subscribe((value) => {
      this.selectedIncident = value;
    });

    // if page was refresh, data from input fields is erased
    // we need to navigate the user back to records list
    if(Object.keys(this.selectedIncident).length === 0 && !this.isAdd){
      this.router.navigate(['/main/records']);
    }
    // get the files related to this case/incident & store in cache
    this.getCaseFiles(this.caseId);
    //get evidences related to this case/incident
    this.getEvidences(this.caseId);
    // case natures
    this.getCategories();
    // get dispositions
    this.getDispositions();
    // edit mode
    if(this.caseId > 0){ 
      if(!this.selectedIncident) {
        console.log('fuck')
        this.getCase(this.caseId);
      }
      console.log('selectedIncident')
      console.log(this.selectedIncident)
      const _incident = this.selectedIncident
      
      this.incidentData.setValue({
        'caseNo':         _incident.case_no,
        'caseNature':     _incident.case_nature,
        'investigator':   _incident.investigator,
        'requestingParty': _incident.requesting_party,
        'incidentTitle':   _incident.incident_title,
        'incidentDescription': _incident.incident_description,
        'disposition':    _incident.disposition,
        'location':       _incident.location,
        'victimName':     _incident.victim,
        'suspectName':    _incident.suspect,
        'reportedBy':     _incident.reported_by,
        'incidentDate':   _incident.incident_date,
        'incidentTime':   _incident.incident_time,
        'incidentDateEdit': _incident.incident_date,
        'incidentTimeEdit':   _incident.incident_time,
        'engineno': [''],
        'chassisno': ['']
      })
     
      this.date = _incident.incident_date
      // set the ng model of the textarea
      this.incidentDescription = _incident.incident_description
      // set the entry mode
      this.isAdd = false;

      // get evidence related to this case/incident
      this.getEvidences(this.caseId);
      this.dataService.evidenceList$.subscribe(e => this.evidences = e)
    }

  }

  onSelectedProduct(product) {
    this.selectedEvidence = product;
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  setCurrent() {
    //Current Date
    this.dp.navigateTo()
  }
  setDate() {
    //Set specific date
    this.dp.navigateTo({ year: 2013, month: 2 });
  }

  navigateEvent(event: any) {
    this.date = event.next;
  }

  onDateSelect(event) {
    let year = event.year,
      month = event.month <= 9 ? '0' + event.month : event.month,
      day = event.day <= 9 ? '0' + event.day : event.day;
    this.date = `${month}/${day}/${year}`;
  }

  async onSubmit(){

    this.isLoading = true;

    if(this.incidentData.invalid){
      this.toastrService.error('Please provide input on required fields. \n Required fields are highlighted with red colors and marked with asterisk (*).');
      return;
    }

    let control = this.incidentData.controls
    let payload = {
      caseNo:         control['caseNo'].value,
      caseNature:     control['caseNature'].value,
      investigator:   this.userDivision === 'soco' ? control['investigator'].value : 'NA',
      requestingParty: control['requestingParty'].value,
      incidentTitle:   this.userDivision === 'soco' ? control['incidentTitle'].value : 'NA',
      incidentDescription: this.userDivision === 'soco' ? control['incidentDescription'].value : 'NA',
      disposition:    this.userDivision === 'soco' || this.userDivision === 'chemistry' ? control['disposition'].value : 'NA',
      incidentTime:   this.isAdd ? this.timeConverterPipe.transform(control['incidentTime'].value) : control['incidentTimeEdit'].value,
      location:       control['location'].value,
      victimName:     control['victimName'].value,
      suspectName:    control['suspectName'].value,
      reportedBy:     this.userDivision === 'soco' ? control['reportedBy'].value : 'NA',
      incidentDate:   this.isAdd ? this.date : control['incidentDateEdit'].value,
      evidences:      this.evidences,
      chassisNo:      this.userDivision === 'physical' ? control['chassisno'].value : 'NA',
      engineNo:       this.userDivision === 'physical' ? control['engineno'].value : 'NA',
      division:       this.userDivision
    }

    // crate new incident record
    if(this.isAdd){

      this.caseService.getByCaseNo(payload.caseNo).subscribe((result: any) => {
    
        setTimeout(() => {
          // check if record already exist
          if(!Utils.isEmpty(result.data)) {

            this.toastrService.error('Case Number already exist in the database!', 'Duplicate Record Found')
      
          } else {

            this.caseService.create(payload).subscribe((result) => {

              this.toastrService.success('New Incident/Event was added to database!', 'New Entry')

              // clear list after successfull submit
              this.evidences = [];
              this.dataService.setFilesList([]);
              this.clearFields();

              this.caseService.getCases(this.userDivision).subscribe((response: any) => {
                
                const filtered = response.data.filter(f => f.division === this.userDivision);
                // const newList = [...filtered, result.data]
                // Update the case/incident list in state
                this.dataService.setCaseList(filtered)
              })
              
            }, 
            err => this.toastrService.error(err, 'Server Issue Encountered'))
          }
        }, 0);

        // stop the loading animation
        this.isLoading = false;

      })

    } else {

      // update
      this.caseService.update(payload, this.caseId).subscribe(() => {
        this.toastrService.success('Incident/Event was successfully updated!', 'Update Incident Record')
      }, 
      err => this.toastrService.error(err, 'Server Issue Encountered'))

      // stop the loading animation
      this.isLoading = false;

      // this.fileService.getFiles(this.caseId).subscribe(f => this.files = f.data)
    }
    // update newly added files on edit mode
    this.fileService.updateFileByCaseId(this.caseId).subscribe(f => console.log(f))

    

  }

  getCase(id: number){
    this.caseService.getById(id).subscribe((record: any) => {
      this.selectedIncident = record.data;
      console.log(record.data)
      this.dataService.setCase(record.data)
    })
  }

  getCaseFiles(id: number){
    this.fileService.getFiles(id).subscribe((response: any) => {
      // store the result in state
      this.dataService.setFilesList(response.data);
    })
  }

  getEvidences(id: number){
    this.caseService.getEvidencesByCaseId(id).subscribe((response: any) => {
      // store the result in state
      this.dataService.setEvidenceList(response.data);
    })
  }

  getCategories(){
    this.categoryService.get().subscribe(c => {

      c.data
        .filter(f => f.division === this.userDivision)
        .map(v => this.categories.push(v.description))
    })
    
  }

  getDispositions(){
    this.dispositionService.getDispositions().subscribe(r => {
      
      r.data.map(dis => this.dispositions.push(dis.description))
    })
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  clearFields(): void{
    this.incidentData = this.fb.group({
      'caseNo':           ['', Validators.required],
      'caseNature':       ['', Validators.required],
      'investigator':     [''],
      'requestingParty':  ['', Validators.required],
      'incidentTitle':    [''],
      'incidentDescription': [''],
      'disposition':      [''],
      'incidentTime':     ['', Validators.required],
      'location':         [''],
      'victimName':       [''],
      'suspectName':      [''],
      'reportedBy':       [''],
      'incidentDate':     ['', Validators.required],
      'incidentDateEdit': [''],
      'incidentTimeEdit': [''],
      'engineno':         [''],
      'chassisno':        ['']
    })
  }

  isFieldValid(field: string) {
    return this.incidentData.get(field).valid && this.incidentData.get(field).touched;
  }

  isSelectionFieldValid(field: string) {
    return this.incidentData.get(field).valid;
  }

  updateCategorySelection(e){
    this.selectedCategory = e.target.value
  }

  back(): void {
    this.router.navigate(['/main/records']);
  }
  
}
