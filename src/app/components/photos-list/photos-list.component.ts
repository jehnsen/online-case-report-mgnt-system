import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.css']
})
export class PhotosListComponent implements OnInit {
  files: any;
  baseUrl: string = environment.apiUrl;
  urlPath: string = "/storage/photos/";
  constructor(private dataService: DataService, private toastr: ToastrService, private fileService: FileService) { }

  ngOnInit(): void {
    this.dataService.fileList$.subscribe((value) => {
      this.files = value;
    });
    
  }

  removeFile(file: any){
    this.fileService.delete(file.id).subscribe(() => {
      
      const index = this.files.indexOf(file);
      this.files.splice(index, 1)

      this.toastr.warning('File was successfully deleted! \n\n' + file.filename, 'Delete File')
    }, 
    err => this.toastr.error(err, 'Server Issue Encountered!'))

    
  }

}
