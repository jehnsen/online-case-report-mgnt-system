import { Component, ViewChild ,OnInit, ChangeDetectorRef, AfterContentChecked  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router  } from '@angular/router'
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FirearminventoryService } from '../../services/firearminventory.service';
import { FileService } from '../../services/file.service';
import { CategoryService } from '../../services/category.service';
import { DispositionService } from '../../services/disposition.service';
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

  isAdd: boolean = true;
  isLoading: boolean;
  firearms: any = [];
  inventoryId: number;
  caseNumber: any;
  existingRecord: any;
  encoderId: number = 1;

  model: NgbDateStruct;
  date: string;

  @ViewChild('dp') dp: NgbDatepicker;

  constructor(
    private fb: FormBuilder,
    private inventoryService: FirearminventoryService, 
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
    this.clearFields();
    
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
      console.log(this.date)
    this.date = `${month}/${day}/${year}`;
  }

  

  onSubmit(){
    let payload = {
      ...this.formData.value, 
      encoder_id:    this.encoderId,
      firearm_name:  this.formData.value.firearmName,
      case_no:       this.formData.value.caseNo,
      requesting_party:  this.formData.value.requestingParty,
      fserial_no:    this.formData.value.fserialNo,
      victim_name:   this.formData.value.victimName,
      suspect_name:  this.formData.value.suspectName,
      incident_date: this.date, 
      incident_time: this.isAdd 
                      ? this.timeConverterPipe.transform(this.formData.controls['incidentTime'].value) 
                      : this.formData.controls['incidentTimeEdit'].value
    }
   
    if(this.isAdd){

      this.inventoryService.create(payload).subscribe((response) => {

        console.log(response)

        this.toastrService.success('New Record was added to database!', 'New Entry')

        // clear list after successfull submit
        this.dataService.setFilesList([]);
        this.clearFields();
        
      }, 
      err => {
        if(err.code === 409){
          this.toastrService.warning('Case number already exist in the database!', 'Duplicate Entry')
        } else {
          this.toastrService.error(err.message, 'Server error')
        }
      }) 

    }
  }

  back(): void {
    this.router.navigate(['/firearms/cases']);
  }

  clearFields(): void{
    this.formData = this.fb.group({
      'caseNo':           [''],
      'firearmName':      [''],
      'cartridge':        [''],
      'fcc':              [''],
      'fb':               [''],
      'accessories':      [''],
      'requestingParty':  [''],
      'fcaliber':         [''],
      'fmake':            [''],
      'fmodel':           [''],
      'ftype':            [''],
      'fserialNo':        [''],
      'location':         [''],
      'victimName':       [''],
      'suspectName':      [''],
      'status':           [''],
      'incidentDate':     [''],
      'incidentDateEdit': [''],
      'incidentTime':     [''],
      'incidentTimeEdit': [''],
      'remarks':          ['']
    })
  }

}
