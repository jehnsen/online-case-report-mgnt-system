import { Component, ViewChild ,OnInit, ChangeDetectorRef, AfterContentChecked  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router  } from '@angular/router'
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CaseService } from '../../services/case.service';
import { FileService } from '../../services/file.service';
import { EvidenceListComponent } from '../evidence-list/evidence-list.component';
import { DataService } from '../../services/data.service';
import { Time24to12Format } from '../../pipes/time24to12.pipe';

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
  files: any = [];
  selectedEvidence: any;
  caseId: number;
  selectedIncident: any;

  caseNumber: any;

  @ViewChild('dp') dp: NgbDatepicker;
  @ViewChild(EvidenceListComponent) evidenceList: any;

  constructor(
    private fb: FormBuilder,
    private caseService: CaseService, 
    private fileService: FileService,
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

    // initialize form group
    this.incidentData = this.fb.group({
      'caseNo':           [''],
      'caseNature':       [''],
      'investigator':     [''],
      'requestingParty':  [''],
      'incidentTitle':    [''],
      'incidentDescription': [''],
      'disposition':      [''],
      'incidentTime':     [''],
      'location':         [''],
      'victimName':       [''],
      'suspectName':      [''],
      'reportedBy':       [''],
      'incidentDate':     [''],
      'incidentDateEdit': [''],
      'incidentTimeEdit': ['']
    })

    this.dataService.selectedProduct$.subscribe((value) => {
      this.selectedEvidence = value;
     
      if(Object.keys(value).length > 0){
        this.evidences.push(value.description)
      }
    });
    this.dataService.setProductList(this.evidences);

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
      this.router.navigate(['/main/cases']);
    }
    // get the files related to this case/incident & store in cache
    this.getCaseFiles(this.caseId);

    if(this.caseId > 0){
      
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
      })
      this.date = _incident.incident_date
      // set the ng model of the textarea
      this.incidentDescription = _incident.incident_description
      // set the entry mode
      this.isAdd = false;
     
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

  onSubmit(){
    let control = this.incidentData.controls
    let payload = {
      caseNo:        control['caseNo'].value,
      caseNature:     control['caseNature'].value,
      investigator:   control['investigator'].value,
      requestingParty: control['requestingParty'].value,
      incidentTitle:   control['incidentTitle'].value,
      incidentDescription: control['incidentDescription'].value,
      disposition:    control['disposition'].value,
      incidentTime:   this.isAdd ? this.timeConverterPipe.transform(control['incidentTime'].value) : control['incidentTimeEdit'].value,
      location:       control['location'].value,
      victimName:     control['victimName'].value,
      suspectName:    control['suspectName'].value,
      reportedBy:     control['reportedBy'].value,
      incidentDate:   this.isAdd ? this.date : control['incidentDateEdit'].value,
      evidences:      this.evidences
    }
    this.isLoading = true;
    console.log(payload)
    // crate new incident record
    if(this.isAdd){
      this.caseService.create(payload).subscribe(() => {
        this.toastrService.success('New Incident/Event was added to database!', 'New Entry')
      }, 
      err => this.toastrService.error(err, 'Server Issue Encountered'))
      this.isLoading = false;

    } else {

      // update
      this.caseService.update(payload, this.caseId).subscribe(() => {
        this.toastrService.success('Incident/Event was successfully updated!', 'Update Incident Record')
      }, 
      err => this.toastrService.error(err, 'Server Issue Encountered'))
      this.isLoading = false;
    }

    this.caseService.getCases().subscribe((response: any) => {
      // Update the case/incident list in state
      this.dataService.setCaseList(response.data)
    })

  }

  getCaseFiles(id: number){
    this.fileService.getFiles(id).subscribe((response: any) => {
      // store the result in state
      this.dataService.setFilesList(response.data);
    })
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

}
