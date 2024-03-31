import { Component, ViewChild ,OnInit, ChangeDetectorRef, AfterContentChecked, Input  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router  } from '@angular/router'
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FirearminventoryService } from '../../services/firearminventory.service';
import { EvidenceListComponent } from '../evidence-list/evidence-list.component';
import { DataService } from '../../services/data.service';
import { Time24to12Format } from '../../pipes/time24to12.pipe';
import { Utils } from '../../helpers/utils';
import { environment } from 'src/environments/environment';
import { FileService } from 'src/app/services/file.service';


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
  isViewOnly: boolean = false;
  isLoading: boolean;
  firearms: any = [];
  inventoryId: number;
  caseNumber: any;
  isUploading: boolean = false;
  encoderId: number = 1;
  data: any;
  fileData: any;
  // selectedRecord: any;
  baseUrl: string = environment.apiUrl;
  urlPath: string = "/storage/photos/";
  imageUrl: string;
  form: FormGroup;
  selectedGunType: string;
  selectedStatus: string;
  firearmTypes: Array<string> = ['REVOLVER', 'HANDGUN', 'PISTOL', 'SHOTGUN', 'RIFLE', 'CARBINE', 'ASSAULT RIFLE', 'SUB-MACHINE GUN', 'MACHINE GUN']
  firearmStatus: Array<string> = ['ACCOUNTED IN CUSTODY', 'DEPOSITED TO COURT/PROSECUTOR', 'WITHDRAWN BY REQUESTING PARTY', 'TURNED-OVER TO FEO', 'TURNED-OVER TO LSS', 'OTHER']

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
    private timeConverterPipe: Time24to12Format,
    private fileService: FileService,
  ) { }

  ngOnInit(): void {
    this.clearFields();

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.recordId = +params.get('id');
    })
    if(this.recordId > 0) {
      // edit mode
      this.isAdd = false;
      this.dataService.selectedFirearm$.subscribe(data => {
       
        this.setFirearmDetail(data)
      })
    } 

    this.firearmTypes = ['REVOLVER', 'HANDGUN', 'PISTOL', 'SHOTGUN', 'RIFLE', 'CARBINE', 'ASSAULT RIFLE', 'SUB-MACHINE GUN', 'MACHINE GUN']

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
      status:       _form.status,
      qty:          _form.qty,
      image_filename: this.fileData.filename
    }
   
    if(this.isAdd){

      this.inventoryService.create(payload).subscribe(response => {

        if(response) {
          this.onUploadPhoto();
          this.toastrService.success('Successfully added to database!', 'New Entry')

          // clear list after successfull submit
          this.dataService.setFilesList([]);
          this.clearFields();
          this.isLoading = false;
        }
        
      }, 
      err => {
        if(err.code === 409){
          this.toastrService.warning('Already exist in the database!', 'Duplicate Entry')
        } else {
          this.toastrService.error(err.message, 'Server error')
        }
      }) 

    } else {

      this.inventoryService.update(this.recordId, payload).subscribe(res => {
        if (res) {
          this.onUploadPhoto()
          this.toastrService.success('Updated Successfully!', 'Update');
          this.isLoading = false;
        }
       
      }, error => this.toastrService.info(error.message, 'Update'));

    }
  }

  back(): void {
    this.router.navigate(['/firearms/cases']);
  }

  onTypeSelect(value: string){
    this.formData.patchValue({ 'ftype': value })
  }

  clearFields(): void{
    this.formData = this.fb.group({
      'firearmName': ['', Validators.required],
      'cartridge':   ['', Validators.required],
      'fcc':         [''],
      'fb':          [''],
      'accessories': [''],
      'fcaliber':    ['', Validators.required],
      'fmake':       ['', Validators.required],
      'fmodel':      ['', Validators.required],
      'ftype':       ['', Validators.required],
      'fserialNo':   [''],
      'status':      [''],
      'qty':         ['']
    })

    this.form = this.fb.group({
      image: [null, Validators.required]
    })
  }

  setFirearmDetail(data) {
    this.formData = this.fb.group({
      'firearmName': data.firearm_name,
      'cartridge':   data.cartridge,
      'fcc':         data.fcc,
      'fb':          data.fb,
      'accessories': data.accessories,
      'fcaliber':    data.fcaliber,
      'fmake':       data.fmake,
      'fmodel':      data.fmodel,
      'ftype':       data.ftype,
      'fserialNo':   data.fserial_no,
      'status':      data.status,
      'qty':         data.qty,
    })
    this.imageUrl = this.baseUrl + this.urlPath + data.image_filename;
    if (!data.image_filename) {
      this.fileData = { filename: 'no-image.jpeg' }
    } else {
      this.fileData = { filename: data.image_filename, filetype: 'image/' + data.image_filename.split('.')[1] }
    }

  }

  selectChangeHandler(value: string){
    this.selectedGunType = value;
  }

  selectStatusHandler(value: string) {
    this.selectedStatus = value;
   
    
  }

  selectPhoto(event: Event){
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.form.patchValue({
      image: file
    })
    this.fileData = { filename: file.name.replace(/ /g, '_'), filetype: file.type }
    this.imageUrl = this.baseUrl + this.urlPath + this.fileData.filename
  }

  onUploadPhoto(){
    if(this.form.invalid) return;
    this.isUploading = true;

    const formData: any = new FormData();

    formData.append('image', this.form.controls['image'].value);
   
    this.fileService.upload(formData).subscribe(response => {
      this.data = response;
      this.isUploading = false;
      this.form.reset();
    })
  }

}
