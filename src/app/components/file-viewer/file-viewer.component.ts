import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.css']
})
export class FileViewerComponent implements OnInit {

  constructor() { }
  @Input() filePath: string;
  @Input() filename: string;
  ngOnInit(): void {
    
  }

}
