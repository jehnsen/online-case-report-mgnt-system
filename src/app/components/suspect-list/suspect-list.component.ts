import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SuspectService } from 'src/app/services/suspect.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suspect-list',
  templateUrl: './suspect-list.component.html',
  styleUrls: ['./suspect-list.component.css']
})

export class SuspectListComponent implements OnInit {
  @Input() evidences: any;

  suspects: any = [];
  isView: boolean;
  
  constructor(private dataService: DataService, private suspectService: SuspectService, private toastrService: ToastrService) { 

  }

  ngOnInit(): void {
    this.getSuspects()
    
  }

  getSuspects(){
    this.dataService.suspectList$.subscribe((value) => {
      this.suspects = value;
    });

    this.dataService.viewValue$.subscribe(value => {
      this.isView = value;
    });
  }

  removeSuspect(id: number){
    
    this.suspectService.delete(id).subscribe((response: any) => {
      if(response.data){
        this.toastrService.success('Successfully removed!', 'Delete');
        
        const newList = this.suspects.filter(s => s.id !== id)
        this.dataService.setSuspectsList(newList);
        this.suspects = newList
      }
    }, err => this.toastrService.error(err, 'Server Issue Encountered'));
    
  }

}
