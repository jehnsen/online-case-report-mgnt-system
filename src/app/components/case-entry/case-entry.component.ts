import { Component, ViewChild ,OnInit, ChangeDetectorRef, AfterContentChecked  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap  } from '@angular/router'
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CaseService } from '../../services/case.service';
import { EvidenceListComponent } from '../evidence-list/evidence-list.component';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-case-entry',
  templateUrl: './case-entry.component.html',
  styleUrls: ['./case-entry.component.css']
})

export class CaseEntryComponent implements OnInit {

  incidentData: FormGroup;

  caseDescription: string = '';
  model: NgbDateStruct;
  date: { year: number, month: number };
  @ViewChild('dp') dp: NgbDatepicker;
  @ViewChild(EvidenceListComponent) evidenceList: any;

  requestingParties: any = [];
  evidences: any = [];
  selectedEvidence: any;
  
  constructor(
    private caseService: CaseService, 
    private toastrService: ToastrService, 
    private calendar: NgbCalendar, 
    private dataService: DataService,
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.getRequestingParties()

    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log('activated route: ' + +params.get('id'))
    })

    this.incidentData = new FormGroup({
      'caseNo':         new FormControl(null, [Validators.required]),
      'caseNature':     new FormControl(null, [Validators.required]),
      'investigator':   new FormControl(null, [Validators.required]),
      'requestingParty': new FormControl(null, [Validators.required]),
      'incidentTitle':   new FormControl(null, [Validators.required]),
      'incidentDescription': new FormControl(null, [Validators.required]),
      'disposition':    new FormControl(null),
      'incidentTime':   new FormControl(null),
      'location':       new FormControl(null),
      'victimName':     new FormControl(null),
      'suspectName':    new FormControl(null),
      'reportedBy':    new FormControl(null),
      'dtpo':     new FormGroup({
        'incidentDate':   new FormControl(null)
      })
    })

    this.dataService.selectedProduct$.subscribe((value) => {
      this.selectedEvidence = value;
      console.log('selected evidence triggered from data service');
      console.log(value)
      if(Object.keys(value).length > 0){
        this.evidences.push(value.description)
      }
    });
    this.dataService.setProductList(this.evidences);

    

  }

  onSelectedProduct(product) {
    this.selectedEvidence = product;
    console.log('printed from parent component: => ' + this.selectedEvidence)
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

  getRequestingParties(): void{
    this.requestingParties = [
      {
        id: 1,
        name: 'Balbalan Municipal Police Station',
        status: 1
      },
      {
        id: 2,
        name: 'Lubuagan Municipal Police Station',
        status: 1
      },
      {
        id: 3,
        name: 'Tabuk City Police Station',
        status: 1
      },
      {
        id: 4,
        name: 'Tanudan Municipal Police Station',
        status: 1
      },
      {
        id: 5,
        name: 'Tinglayan Municipal Police Station',
        status: 1
      },
      {
        id: 6,
        name: 'Pasil Municipal Police Station',
        status: 1
      },
      {
        id: 7,
        name: 'Pinukpok, Municipal Police Station',
        status: 1
      },
      {
        id: 8,
        name: 'Rizal Municipal Police Station',
        status: 1
      },
      {
        id: 9,
        name: 'Bulanao Sub-Station',
        status: 1
      }
    ]

  }

  onSubmit(){
    const payload = { ...this.incidentData.value, evidences: this.evidences}
    console.log(payload)
    this.caseService.create(payload).subscribe(() => {
      this.toastrService.success('New Incident/Event was added to database!', 'New Entry')
    }, 
    err => console.log(err))
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

}
