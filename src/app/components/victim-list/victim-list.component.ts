import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { VictimService } from 'src/app/services/victim.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-victim-list',
  templateUrl: './victim-list.component.html',
  styleUrls: ['./victim-list.component.css']
})

export class VictimListComponent implements OnInit {
  victims: any = [];
  isView: boolean;

  constructor(private dataService: DataService, private victimService: VictimService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getVictims()
  }

  getVictims() {
    this.dataService.victimList$.subscribe(value => this.victims = value);

    this.dataService.viewValue$.subscribe(value => this.isView = value);
  }

  removeVictim(id: number) {
    this.victimService.delete(id).subscribe((response: any) => {
      if(response.data){
        this.toastrService.success('Successfully removed!', 'Delete');
        
        const newList = this.victims.filter(s => s.id !== id)
        this.dataService.setVictimsList(newList);
        this.victims = newList
      }
    }, err => this.toastrService.error(err, 'Server Issue Encountered'));
    
  }
}
