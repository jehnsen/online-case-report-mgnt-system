import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap  } from '@angular/router'
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-firearms-view',
  templateUrl: './firearms-view.component.html',
  styleUrls: ['./firearms-view.component.css']
})
export class FirearmsViewComponent implements OnInit {

  selectedRecord: any;
  id: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id')
    })

    this.getSelectedRecord();

  }

  getSelectedRecord() {
    this.dataService.firearmInventoryList$.subscribe(data => {
      this.selectedRecord = data.find(f => f.id === this.id);
    })
  }

  print(): void {
    window.print();
  }
}
