import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileService } from '../../services/file.service';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.css']
})
export class PhotoUploaderComponent implements OnInit {

  form: FormGroup;

  isUploading: boolean = false;
  data: any;
  fileData: any;

  constructor(public fb: FormBuilder, private fileService: FileService, private dataService: DataService, private toastrService: ToastrService) { 
    this.form = this.fb.group({
      image: [null, Validators.required]
    })
  }

  ngOnInit(): void { }

  uploadPhoto(event: Event){
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.form.patchValue({
      image: file
    })
    this.fileData = { filename: file.name.replace(/ /g, '_'), filetype: file.type }
  }

  submitForm(){
  
    if(this.form.invalid) return;
    this.isUploading = true;

    const formData: any = new FormData();

    formData.append('image', this.form.controls['image'].value);
   
    this.fileService.upload(formData).subscribe(response => {
      this.data = response;
      this.isUploading = false;
      this.form.reset();

      this.insert({
        caseId: 0,
        filename: this.fileData.filename,
        filetype: this.fileData.filetype
      })

    })
  }

  insert(payload){
    console.log(payload)
    this.fileService.create(payload).subscribe(() => {
      
      
      this.fileService.getFiles(0).subscribe((response: any) => {
        // update the state
        this.dataService.setFilesList(response.data);
      })

      this.toastrService.success('File was successfully uploaded!', 'Upload File')
    }, 
    err => this.toastrService.error(err, 'Server Issue Encountered!'))
  }

  

}
