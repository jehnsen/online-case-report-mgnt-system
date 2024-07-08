import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Utils } from 'src/app/helpers/utils';
import { DataService } from 'src/app/services/data.service';
import { FileService } from 'src/app/services/file.service';
import { FirearminventoryService } from 'src/app/services/firearminventory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-firearm-entry',
  templateUrl: './modal-firearm-entry.component.html',
  styleUrls: ['./modal-firearm-entry.component.css']
})
export class ModalFirearmEntryComponent implements OnInit {
  firearms: any = [];
  formData: FormGroup;
  isLoading: boolean = false;
  firearmTypes: Array<string> = ['REVOLVER', 'HANDGUN', 'PISTOL', 'SHOTGUN', 'RIFLE', 'CARBINE', 'ASSAULT RIFLE', 'SUB-MACHINE GUN', 'MACHINE GUN']
  firearmStatus: Array<string> = ['ACCOUNTED IN CUSTODY', 'DEPOSITED TO COURT/PROSECUTOR', 'WITHDRAWN BY REQUESTING PARTY', 'TURNED-OVER TO FEO', 'TURNED-OVER TO LSS', 'OTHER']
  selectedGunType: string;
  selectedStatus: string;
  isUploading: boolean = false;
  data: any;
  fileData: any;
  baseUrl: string = environment.apiUrl;
  urlPath: string = "/storage/photos/";
  imageUrl: string;

  form: FormGroup;

  @Output() newFireArmsListEvent = new EventEmitter<any>();
  @Input() detail: any;

  constructor(
    private fb: FormBuilder, 
    private fiService: FirearminventoryService, 
    private fileService: FileService,
    private toastrService: ToastrService,
    private dataService: DataService,
  )
  { 
    this.form = this.fb.group({
      image: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.initFields()
    this.fileData = null;
    this.imageUrl = '';

  }

  ngOnChange() {
    // this.dataService.
  }

  onSubmit() {

    this.isLoading = true;
    const control = this.formData.controls
    const payload = {
      case_id: 0,
      case_no: 'new',
      firearm_name: control['firearmName'].value,
      cartridge: control['cartridge'].value,
      fcc: control['fcc'].value,
      fb: control['fb'].value,
      accessories: control['accessories'].value,
      fmake: control['fmake'].value,
      fcaliber: control['fcaliber'].value,
      fmodel: control['fmodel'].value,
      ftype: control['ftype'].value,
      fserial_no: control['fserialNo'].value,
      image_filename: this.fileData ? this.fileData.filename : '',
      qty: control['qty'].value,
      status: control['status'].value
    }

    if (!payload.firearm_name || !payload.fmake || !payload.ftype || !payload.fserial_no) {
      this.toastrService.warning('Required Fields', 'Please fillup the required fields.');
      
      this.fileData = null;
      return;
    }

    this.fiService.create(payload).subscribe(response => {
      if (!Utils.isEmpty(response.data)) {
        // update the state
        const { id, case_no, firearm_name, cartridge, fcc, fb, accessories, fcaliber, fmake, fmodel, ftype, fserial_no, qty, status, image_filename } = response.data;
        this.firearms.push({
          id,
          case_no,
          firearm_name,
          cartridge,
          fcc,
          fb,
          accessories,
          fcaliber,
          fmake,
          fmodel,
          ftype,
          fserial_no,
          qty,
          status,
          image_filename
        })
        this.dataService.setFirearmList(this.firearms)

        this.newFireArmsListEvent.emit(response.data);

        // this.onUploadPhoto()

        // this.toastrService.success('Successfully save to database!', 'Firearm Entry');

        // this.isLoading = false;

        // this.initFields();
      }
    }, 
      err => this.toastrService.error(err, 'Server Issue Encountered')
    )

    this.fileData = null;

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

  initFields(): void {
    this.formData = this.fb.group({
      'firearmName': [''],
      'cartridge': [''],
      'fcc': [''],
      'fb': [''],
      'accessories': [''],
      'fcaliber': [''],
      'fmake': [''],
      'fmodel': [''],
      'ftype': [''],
      'fserialNo': [''],
      'qty': [''],
      'status': ['']
    });
  }

}
