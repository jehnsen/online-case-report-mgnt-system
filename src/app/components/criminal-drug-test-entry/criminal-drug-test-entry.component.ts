import { Component, ViewChild ,OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router  } from '@angular/router'
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CriminalDrugTestService } from '../../services/criminal-drug-test.service';
import { FileService } from '../../services/file.service';
import { CategoryService } from '../../services/category.service';
import { DispositionService } from '../../services/disposition.service';
import { EvidenceListComponent } from '../evidence-list/evidence-list.component';
import { DataService } from '../../services/data.service';
import { Time24to12Format } from '../../pipes/time24to12.pipe';
import { Utils } from '../../helpers/utils';

const operationTypeList = [
  'BUY-BUST',
  'SEARCH WARRANT',
  'INFLAGRANTE DE LICTO',
  'RECOVERED',
  'TEST BUY',
  'OPLAN-GALUGAD',
  'SACLEO',
  'MARIJUANA ERADICATION',
  "CITIZEN'S ARREST",
  'CHECK POINT',
  'CASING/SURVEILLANCE',
  'INCIDENTAL TO LAWFUL',
  'SEARCH',
  'CHANGE UPON'
]

const courtBranches = [
  'RTC 25',
  'RTC 39',
  'CERTIFICATE OF NO CASE FILED'
]

@Component({
  selector: 'app-criminal-drug-test-entry',
  templateUrl: './criminal-drug-test-entry.component.html',
  styleUrls: ['./criminal-drug-test-entry.component.css'],
  providers: [ Time24to12Format ]
})
export class CriminalDrugTestEntryComponent implements OnInit {

  formData: FormGroup;

  id: any;
  isAdd: boolean = true;
  isLoading: boolean = false;
  firearms: any = [];
  inventoryId: number;
  caseNumber: any;
  existingRecord: any;
  encoderId: number = 1;
  operationTypes: any;
  courtBranches: any;

  model: NgbDateStruct;
  model2: NgbDateStruct;
  date: string;
  date_last_withdrawn_string: string;
  selectedDrugtestRecord: any;

  @ViewChild('dp') dp: NgbDatepicker;

  constructor(
    private fb: FormBuilder,
    private service: CriminalDrugTestService, 
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

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id')
    })

    // set the requesting party field
    this.dataService.selectedParty$.subscribe((party) => {
      if(Object.keys(party).length > 0)
        this.formData.patchValue({ 'requesting_party': party })
    })

    this.operationTypes = operationTypeList;
    this.courtBranches = courtBranches;

    // edit mode
    if(this.id > 0){
      this.isAdd = false;
      this.getSelectedDrugTestRecord(this.id);
     
      this.dataService.selectedDrugRestRecord$.subscribe(value => {
        this.selectedDrugtestRecord = value;
        if(this.selectedDrugtestRecord){

          const _data = this.selectedDrugtestRecord;
      
          this.formData.setValue({
            'case_no':         _data.case_no,
            'suspect_name':     _data.suspect_name,
            'mother_unit':      _data.mother_unit,
            'operation_type':   _data.operation_type,
            'examiner':         _data.examiner,
            'investigator':     _data.investigator,
            'incident_date':    _data.incident_date,
            'incident_time':    _data.incident_time,
            'incident_date_edit':    _data.incident_date,
            'incident_time_edit':    _data.incident_time,
            'speciment_count':  _data.speciment_count,
            'pph_count':        _data.pph_count,
            'qty_received':     _data.qty_received,
            'gross_weight':     _data.gross_weight,
            'classification':   _data.classification,
            'delivered_by':     _data.delivered_by,
            'description':      _data.description,
            'received_by':      _data.received_by,
            'evidence_status':  _data.evidence_status,
            'qty_turned_over':  _data.qty_turned_over,
            'date_last_withdrawn': _data.date_last_withdrawn,
            'date_last_withdrawn_edit': _data.date_last_withdrawn,
            'court_branch':     _data.court_branch,
            'criminal_case_no': _data.criminal_case_no,
            'qty_remaining':    _data.qty_remaining,
            'is_no_movement':   _data.is_no_movement,
            'requesting_party': _data.requesting_party,
            'remarks':          _data.remarks
          })
        }
        
      })
      
    }
  }

  onSubmit(){
    this.isLoading = true;

    let payload : any;

    if(this.isAdd){
      payload = {
        ...this.formData.value, 
        incident_date: this.date,
        date_last_withdrawn: this.date_last_withdrawn_string,
        incident_time: this.timeConverterPipe.transform(this.formData.value.incident_time)
      }

      this.service.create(payload).subscribe(result => {
        if(result){
          this.toastrService.success('Criminal Drugtest Record successfully saved in the database!');
          this.isLoading = false;
        }
        
      })

    } else {

      payload = {
        ...this.formData.value, 
        incident_date: this.formData.value.incident_date_edit,
        date_last_withdrawn: this.formData.value.date_last_withdrawn_edit,
        incident_time: this.formData.value.incident_time_edit
      }
      delete payload.incident_date_edit
      delete payload.incident_time_edit
      delete payload.date_last_withdrawn_edit

      this.service.update(this.id, payload).subscribe((result: any) => {
        if(result){
          this.toastrService.success('Criminal Drugtest Record successfully updated!');
          this.isLoading = false;
        }

      })
    }
    
  }

  getSelectedDrugTestRecord(id: number){
   
    this.service.getById(id).subscribe((result: any) => {
      
      if(result.data){
       
        this.selectedDrugtestRecord = result.data[0];
       
        this.dataService.setSelectedDrugRestRecord(this.selectedDrugtestRecord)
      }
      
    })
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

  onDateLastWithdrawnSelect(event) {
    let year = event.year,
      month = event.month <= 9 ? '0' + event.month : event.month,
      day = event.day <= 9 ? '0' + event.day : event.day;
      
    this.date_last_withdrawn_string = `${month}/${day}/${year}`;
  }

  back(): void {
    this.router.navigate(['main/drugtest']);
  }

  clearFields(): void{
    this.formData = this.fb.group({
      'case_no':          ['', Validators.required],
      'suspect_name':     ['', Validators.required],
      'mother_unit':      ['', Validators.required],
      'operation_type':   ['', Validators.required],
      'examiner':         ['', Validators.required],
      'investigator':     [''],
      'incident_date':    ['', Validators.required],
      'incident_time':    ['', Validators.required],
      'incident_date_edit':    [''],
      'incident_time_edit':    [''],
      'speciment_count':  [''],
      'pph_count':        [''],
      'qty_received':     [''],
      'gross_weight':     [''],
      'classification':   ['', Validators.required],
      'delivered_by':     [''],
      'description':      [''],
      'received_by':      [''],
      'evidence_status':  [''],
      'qty_turned_over':  [''],
      'date_last_withdrawn': [''],
      'date_last_withdrawn_edit': [''],
      'court_branch':     [''],
      'criminal_case_no': ['', Validators.required],
      'qty_remaining':    [''],
      'is_no_movement':   [''],
      'requesting_party': [''],
      'remarks':          ['']
    })
  }

  onTypeSelect(value){
    this.formData.patchValue({ 'operation_type': value })
  }

  onCourtBranchSelect(value){
    this.formData.patchValue({ 'court_branch': value })
  }

}
