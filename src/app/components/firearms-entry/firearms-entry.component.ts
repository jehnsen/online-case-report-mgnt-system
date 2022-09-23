import { Component, ViewChild ,OnInit, ChangeDetectorRef, AfterContentChecked  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router  } from '@angular/router'
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FirearminventoryService } from '../../services/firearminventory.service';
import { EvidenceListComponent } from '../evidence-list/evidence-list.component';
import { DataService } from '../../services/data.service';
import { Time24to12Format } from '../../pipes/time24to12.pipe';
import { Utils } from '../../helpers/utils';
@Component({
  selector: 'app-firearms-entry',
  templateUrl: './firearms-entry.component.html',
  styleUrls: ['./firearms-entry.component.css'],
  providers: [ Time24to12Format ]
})
export class FirearmsEntryComponent implements OnInit {
  formData: FormGroup;

  recordId: number = 0;
  isAdd: boolean = true;
  isLoading: boolean;
  firearms: any = [];
  inventoryId: number;
  caseNumber: any;
  existingRecord: any;
  encoderId: number = 1;
  firearmTypes: any = [];
  selectedRecord: any;

  model: NgbDateStruct;
  date: string;

  @ViewChild('dp') dp: NgbDatepicker;

  constructor(
    private fb: FormBuilder,
    private inventoryService: FirearminventoryService, 
    private toastrService: ToastrService, 
    private calendar: NgbCalendar, 
    private dataService: DataService,
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private timeConverterPipe: Time24to12Format
  ) { }

  ngOnInit(): void {
    this.clearFields();

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.recordId = +params.get('id');
    })
    if(this.recordId > 0) {
      this.isAdd = false;
    }

    // set the requesting party field
    this.dataService.selectedParty$.subscribe((party) => {
      if(Object.keys(party).length > 0)
        this.formData.patchValue({ 'requestingParty': party })
    })
    
    this.firearmTypes = ['REVOLVER', 'HANDGUN', 'PISTOL', 'SHOTGUN', 'RIFLE', 'CARBINE', 'ASSAULT RIFLE', 'SUB-MACHINE GUN', 'MACHINE GUN']
  
    if(!this.isAdd){
      this.getSelectedInventoryRecord();
    }


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
    this.isLoading = true;
    const _form = this.formData.value
    let payload = {
      encoder_id:    this.encoderId,
      case_no:      _form.caseNo,
      firearm_name: _form.firearmName,
      cartridge:    _form.cartridge,
      fcc:          _form.fcc,
      fb:           _form.fb,
      accessories:  _form.accessories,
      fcaliber:     _form.fcaliber,
      fmake:        _form.fmake,
      fmodel:       _form.fmodel,
      ftype:        _form.ftype,
      fserial_no:   _form.fserialNo,
      requesting_party:  _form.requestingParty,
      victim_name:   _form.victimName,
      suspect_name:  _form.suspectName,
      incident_date: this.isAdd ? this.date : this.formData.controls['incidentDateEdit'].value, 
      incident_time: this.isAdd 
                      ? this.timeConverterPipe.transform(this.formData.controls['incidentTime'].value) 
                      : this.formData.controls['incidentTimeEdit'].value,
      location:     _form.location,
      status:       _form.status,
      remarks:      _form.remarks
    }
   
    if(this.isAdd){

      this.inventoryService.create(payload).subscribe((response) => {
        this.toastrService.success('New Record was added to database!', 'New Entry')

        // clear list after successfull submit
        this.dataService.setFilesList([]);
        this.clearFields();
        this.isLoading = false;
      }, 
      err => {
        if(err.code === 409){
          this.toastrService.warning('Case number already exist in the database!', 'Duplicate Entry')
        } else {
          this.toastrService.error(err.message, 'Server error')
        }
      }) 

    } else {
     
      this.inventoryService.update(this.recordId, payload).subscribe(response => {
        if(response.data) {
          this.toastrService.success('Updated Successfully!', 'Update');
          this.isLoading = false;
        }
      })
      
    }
  }

  getSelectedInventoryRecord(){
    this.dataService.firearmInventoryList$.subscribe(data => {
      this.selectedRecord = data.find(f => f.id === this.recordId);
      const f = this.selectedRecord
      this.formData.patchValue({ 
        'caseNo':           f.case_no,
        'firearmName':      f.firearm_name,
        'cartridge':        f.cartridge,
        'fcc':              f.fcc,
        'fb':               f.fb,
        'accessories':      f.accessories,
        'requestingParty':  f.requesting_party ,
        'fcaliber':         f.fcaliber ,
        'fmake':            f.fmake ,
        'fmodel':           f.fmodel ,
        'ftype':            f.ftype ,
        'fserialNo':        f.fserial_no,
        'location':         f.location,
        'victimName':       f.victim_name,
        'suspectName':      f.suspect_name,
        'status':           f.status,
        'incidentDate':     f.incident_date,
        'incidentDateEdit': f.incident_date,
        'incidentTime':     f.incident_time ,
        'incidentTimeEdit': f.incident_time,
        'remarks':          f.remarks
      })

    })
  }

  back(): void {
    this.router.navigate(['/firearms/cases']);
  }

  onTypeSelect(value: string){
    this.formData.patchValue({ 'ftype': value })
  }

  clearFields(): void{
    this.formData = this.fb.group({
      'caseNo':           ['', Validators.required],
      'firearmName':      ['', Validators.required],
      'cartridge':        ['', Validators.required],
      'fcc':              [''],
      'fb':               [''],
      'accessories':      [''],
      'requestingParty':  ['', Validators.required],
      'fcaliber':         ['', Validators.required],
      'fmake':            ['', Validators.required],
      'fmodel':           ['', Validators.required],
      'ftype':            ['', Validators.required],
      'fserialNo':        [''],
      'location':         [''],
      'victimName':       [''],
      'suspectName':      [''],
      'status':           [''],
      'incidentDate':     ['', Validators.required],
      'incidentDateEdit': [''],
      'incidentTime':     ['', Validators.required],
      'incidentTimeEdit': [''],
      'remarks':          ['']
    })
  }

}
