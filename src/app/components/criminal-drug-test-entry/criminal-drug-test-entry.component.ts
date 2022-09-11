import { Component, ViewChild ,OnInit, ChangeDetectorRef } from '@angular/core';
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
  selector: 'app-criminal-drug-test-entry',
  templateUrl: './criminal-drug-test-entry.component.html',
  styleUrls: ['./criminal-drug-test-entry.component.css'],
  providers: [ Time24to12Format ]
})
export class CriminalDrugTestEntryComponent implements OnInit {

  formData: FormGroup;

  isAdd: boolean = true;
  isLoading: boolean = false;
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

  onSubmit(){

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
    console.log(event)
    let year = event.year,
      month = event.month <= 9 ? '0' + event.month : event.month,
      day = event.day <= 9 ? '0' + event.day : event.day;
      
    this.date = `${month}/${day}/${year}`;
  }

  back(): void {
    this.router.navigate(['main/drugtest']);
  }

  clearFields(): void{
    this.formData = this.fb.group({
      'case_no':          [''],
      'suspect_name':     [''],
      'mother_unit':      [''],
      'operation_type':   [''],
      'examiner':         [''],
      'investigator':     [''],
      'incident_date':    [''],
      'incident_time':    [''],
      'speciment_count':  [''],
      'pph_count':        [''],
      'qty_received':     [''],
      'gross_weight':     [''],
      'classification':   [''],
      'delivered_by':     [''],
      'description':      [''],
      'received_by':      [''],
      'evidence_status':  [''],
      'qty_turned_over':  [''],
      'date_last_withdrawn': [''],
      'court_branch':     [''],
      'criminal_case_no': [''],
      'qty_remaining':    [''],
      'is_no_movement':   [''],
      'requesting_party': [''],
      'remarks':          ['']
    })
  }

}
