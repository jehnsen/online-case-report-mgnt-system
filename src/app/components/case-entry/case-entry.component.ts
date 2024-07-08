import { Component, ViewChild, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CaseService } from '../../services/case.service';
import { FileService } from '../../services/file.service';
import { CategoryService } from '../../services/category.service';
import { DispositionService } from '../../services/disposition.service';
import { EvidenceListComponent } from '../evidence-list/evidence-list.component';
import { VictimService } from '../../services/victim.service';
import { SuspectService } from '../../services/suspect.service';
import { DataService } from '../../services/data.service';
import { Time24to12Format } from '../../pipes/time24to12.pipe';
import { Utils } from '../../helpers/utils';

@Component({
  selector: 'app-case-entry',
  templateUrl: './case-entry.component.html',
  styleUrls: ['./case-entry.component.css'],
  providers: [Time24to12Format]
})

export class CaseEntryComponent implements OnInit {

  incidentData: FormGroup;

  incidentDescription: string = '';
  model: NgbDateStruct;
  date: string;

  isAdd: boolean = true;
  isLoading: boolean;
  evidences: any = [];
  suspects: any = [];
  victims: any = [];
  categories: any = [];
  files: any = [];
  dispositions: any = [];
  selectedEvidence: any;
  caseId: number;
  selectedIncident: any;
  firearms: any = [];

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
    private timeConverterPipe: Time24to12Format,
    private victimService: VictimService,
    private suspectService: SuspectService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.caseId = +params.get('id');
    })
    // let param= this.route.snapshot.paramMap.get('id');

    // initialize form group
    this.clearFields();

    this.userData = JSON.parse(window.sessionStorage.getItem('auth-user')).user;
    this.userDivision = this.userData.division;
    if (this.userData.usertype !== 'Encoder') {
      this.router.navigate(['/main/records']);
    }
    this.dataService.setIsViewValue(false);

    // edit mode
    if (this.caseId > 0) {

      this.getSelectedCase(this.caseId)

      // set the entry mode
      this.isAdd = false;

    } else {

      // add mode
      this.dataService.setVictimsList([])
      this.dataService.setSuspectsList([]);
      this.dataService.setEvidenceList([]);
      this.dataService.setFilesList([]);

      
    }

    // case natures
    this.getCategories();
    // get dispositions
    this.getDispositions();

    this.dataService.selectedEvidence$.subscribe((value) => {
      this.selectedEvidence = value;
      if (Object.keys(value).length > 0) {
        this.evidences.push(value)
      }

    });
    this.dataService.setEvidenceList(this.evidences);

    // set the requesting party field
    this.dataService.selectedParty$.subscribe((party) => {
      if (Object.keys(party).length > 0)
        this.incidentData.patchValue({ 'requestingParty': party })
    })

    // clean unsave suspect & victims entries
    this.caseService.cleanEntries().subscribe(d => console.log(d))
    
  }

  getSelectedCase(id: number): void {
    this.caseService.getById(id).subscribe(response => {
      // if(response.data.data && Array.isArray(response.data.data[0])) 
      setTimeout(() => {
        this.selectedIncident = response.data.data[0]

        // case data
        const _data = response.data.data[0];
        this.incidentData.setValue({
          'caseNo': _data.case_no,
          'caseNature': _data.case_nature,
          'investigator': _data.investigator,
          'requestingParty': _data.requesting_party,
          'incidentTitle': _data.incident_title,
          'incidentDescription': _data.incident_description,
          'disposition': _data.disposition,
          'location': _data.location,
          'reportedBy': _data.reported_by,
          'incidentDate': _data.incident_date,
          'incidentTime': _data.incident_time,
          'incidentDateEdit': _data.incident_date,
          'incidentTimeEdit': _data.incident_time,
          'engineno': _data.engine_no,
          'chassisno': _data.chassis_no
        })
        this.date = _data.incident_date
        

        this.dataService.setEvidenceList(response.data.evidences);
        this.dataService.setSuspectsList(response.data.suspects);
        this.dataService.setVictimsList(response.data.victims);
        this.dataService.setFilesList(response.data.files);
        // this.dataService.setFirearmList(response.data.firearms);
        this.firearms = response.data.firearms;

      }, 0);
    })
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

  async onSubmit() {

    this.isLoading = true;

    if (this.incidentData.invalid) {
      this.toastrService.error('Please provide input on required fields. \n Required fields are highlighted with red colors and marked with asterisk (*).');
      // this.isLoading = false;
      return;
    }

    if (this.userDivision === 'soco') {
      if (Utils.isEmpty(this.incidentData.value.incidentTitle)
        || Utils.isEmpty(this.incidentData.value.incidentDescription)
        || Utils.isEmpty(this.incidentData.value.disposition)) {
        this.toastrService.error('Please provide input on required fields. \n Required fields are highlighted with red colors and marked with asterisk (*).');
        // this.isLoading = false;
        return;
      }
    }

    // get the suspects from suspect component
    this.dataService.suspectList$.subscribe((value) => {
      this.suspects = value;
    });

    // get the victims from victims component
    this.dataService.victimList$.subscribe((value) => {
      this.victims = value;
    });

    this.dataService.evidenceList$.subscribe((value) => {
      this.evidences = value;
    });

    let control = this.incidentData.controls
    let payload = {
      caseNo: control['caseNo'].value,
      caseNature: control['caseNature'].value,
      investigator: control['investigator'].value,
      requestingParty: control['requestingParty'].value,
      incidentTitle: this.userDivision === 'soco' ? control['incidentTitle'].value : 'NA',
      incidentDescription: this.userDivision === 'soco' ? control['incidentDescription'].value : 'NA',
      disposition: this.userDivision === 'soco' || this.userDivision === 'chemistry' ? control['disposition'].value : 'NA',
      incidentTime: this.isAdd ? this.timeConverterPipe.transform(control['incidentTime'].value) : control['incidentTimeEdit'].value,
      location: control['location'].value,
      victims: this.isAdd ? '' : this.victims,
      suspects: this.isAdd ? '' : this.suspects,
      reportedBy: this.userDivision === 'soco' ? control['reportedBy'].value : 'NA',
      incidentDate: this.isAdd ? this.date : control['incidentDateEdit'].value,
      evidences: this.evidences,
      chassisNo: this.userDivision === 'physical' ? control['chassisno'].value : 'NA',
      engineNo: this.userDivision === 'physical' ? control['engineno'].value : 'NA',
      division: this.userDivision
    }

    // crate new incident record
    if (this.isAdd) {

      this.caseService.getByCaseNo(payload.caseNo).subscribe((result: any) => {

        setTimeout(() => {
          // check if record already exist
          if (!Utils.isEmpty(result.data)) {

            this.toastrService.error('Case Number already exist in the database!', 'Duplicate Record Found')

          } else {

            this.caseService.create(payload).subscribe((result) => {

              if (result) {
                this.toastrService.success('New Incident/Event was added to database!', 'New Entry')
                // stop the loading animation
                this.isLoading = false;
                // clear victims & suspects in state
                this.dataService.setVictimsList([])
                this.dataService.setSuspectsList([])
              }

              // clear list after successfull submit
              this.evidences = [];
              this.dataService.setEvidenceList([]);
              this.dataService.setFilesList([]);
              this.resetFirearmList();
              this.clearFields();

              this.caseService.getCases().subscribe((response: any) => {

                const filtered = response.data.filter(f => f.division === this.userDivision);

                // Update the case/incident list in state
                this.dataService.setCaseList(filtered)
              })

            },
              err => this.toastrService.error(err, 'Server Issue Encountered'))
          }
        }, 0);

      })

    } else {

      // update
      this.caseService.update(payload, this.caseId).subscribe(result => {
        if (result) {
          this.toastrService.success('Incident/Event was successfully updated!', 'Update Incident Record');
          // stop the loading animation
          this.isLoading = false;

          // refresh the list
          this.caseService.getCases().subscribe((response: any) => {
            const filtered = response.data.filter(f => f.division === this.userDivision);
            // Update the case/incident list in state
            this.dataService.setCaseList(filtered)
          })
        }

      },
        err => this.toastrService.error(err, 'Server Issue Encountered'))

    }
    // update newly added files on edit mode
    this.fileService.updateFileByCaseId(this.caseId).subscribe(f => console.log(f))

  }

  getCase(id: number) {
    this.caseService.getById(id).subscribe((record: any) => {
      this.selectedIncident = record.data;
      this.dataService.setCase(record.data)
    })
  }

  getCaseFiles(id: number) {
    this.fileService.getFiles(id).subscribe((response: any) => {
      // store the result in state
      this.dataService.setFilesList(response.data);
    })
  }

  getEvidences(id: number) {
    this.caseService.getEvidencesByCaseId(id).subscribe((response: any) => {
      // store the result in state
      this.dataService.setEvidenceList(response.data);
    })
  }

  getCategories() {
    this.categoryService.get().subscribe(c => {

      c.data
        .filter(f => f.division === this.userDivision)
        .map(v => this.categories.push(v.description))
    })

  }

  getDispositions() {
    if (this.dispositions.length > 0) return;
    this.dispositionService.getDispositions().subscribe(r => {
      r.data
        .filter(f => f.division === this.userDivision)
        .map(dis => this.dispositions.push(dis.description))
    })
  }

  getVictims(id: number): void {
    this.victimService.getByCaseId(id).subscribe(
      response => {
        if (response.data.length > 0 && Array.isArray(response.data)) {
          this.victims = response.data

          this.dataService.setVictimsList(response.data);
        }
      },
      () => this.dataService.setVictimsList([])
    )
  }

  getSuspects(id: number): void {
    this.suspectService.getByCaseId(id).subscribe(
      response => {
        if (response.data && Array.isArray(response.data)) {
          this.suspects = response.data
          this.dataService.setSuspectsList(response.data);
        }
      },
      () => this.dataService.setSuspectsList([])
    )
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  clearFields(): void {
    this.incidentData = this.fb.group({
      'caseNo': ['', Validators.required],
      'caseNature': ['', Validators.required],
      'investigator': [''],
      'requestingParty': ['', Validators.required],
      'incidentTitle': [''],
      'incidentDescription': [''],
      'disposition': [''],
      'incidentTime': ['', Validators.required],
      'location': [''],
      // 'victimName': [''],
      // 'suspectName': [''],
      'reportedBy': [''],
      'incidentDate': ['', Validators.required],
      'incidentDateEdit': [''],
      'incidentTimeEdit': [''],
      'engineno': [''],
      'chassisno': ['']
    })
  }

  resetFirearmList(){
    this.firearms = []
  }

  isFieldValid(field: string) {
    return this.incidentData.get(field).valid && this.incidentData.get(field).touched;
  }

  isSelectionFieldValid(field: string) {
    return this.incidentData.get(field).valid;
  }

  updateCategorySelection(e) {
    this.selectedCategory = e.target.value
  }

  back(): void {
    this.router.navigate(['/main/records']);
  }

}
