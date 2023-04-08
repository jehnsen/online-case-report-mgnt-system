import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suspect-list',
  templateUrl: './suspect-list.component.html',
  styleUrls: ['./suspect-list.component.css']
})
export class SuspectListComponent implements OnInit {
  suspects: any = [];
  constructor() { }

  ngOnInit(): void {
  }

  removeSuspect(id){

  }

  addSuspect(id, data){

  }

}
