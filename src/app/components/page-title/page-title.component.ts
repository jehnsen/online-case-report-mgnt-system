import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent implements OnInit {

  constructor(private dataService: DataService) { }
  currentPage: string;
  ngOnInit(): void {
    this.dataService.selectedPage$.subscribe(p => this.currentPage = p);
    this.currentPage = localStorage.getItem('currentPage');
  }

}
