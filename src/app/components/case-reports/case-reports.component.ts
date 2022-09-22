import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-case-reports',
  templateUrl: './case-reports.component.html',
  styleUrls: ['./case-reports.component.css']
})
export class CaseReportsComponent implements OnInit {
  cases: any = [];
  barangays: any= [];
  p: number = 1;
  location: string;
  filteredCases: any = []
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
   this.getCasesPerBarangay(''); 
  }

  getCasesPerBarangay(location){
    this.dataService.caseList$.subscribe((data) => {
      if(data.length > 0){
        
        this.cases = data.filter(f => f.location === location);
        this.cases = this.findOcc(this.cases, 'case_nature');

        

        data.map(b => {
          if(b !== null) this.barangays.push(b.location)
        })

        this.barangays = [...new Set(this.barangays)]


        // get cases by date
        this.getCasesPerMonth(data);
      }
    });
  }

  onSelect(brgy){
    this.location = brgy
    this.getCasesPerBarangay(this.location); 
  }

  findOcc(arr, key){
    let arr2 = [];
      
    arr.forEach((x)=>{
         
      // Checking if there is any object in arr2
      // which contains the key value
       if(arr2.some((val)=>{ return val[key] == x[key] })){
           
         // If yes! then increase the occurrence by 1
         arr2.forEach((k)=>{
           if(k[key] === x[key]){ 
             k["occurrence"]++
           }
        })
           
       }else{
         // If not! Then create a new object initialize 
         // it with the present iteration key's value and 
         // set the occurrence to 1
         let a = {}
         a[key] = x[key]
         a["occurrence"] = 1
         arr2.push(a);
       }
    })
      
    return arr2
  }
    
  getCasesPerMonth(arr){
    // arr.filter(c => new Date(c.incident_date))
    arr.map(f => {
      console.log(new Date(f.incident_date))
    })

    // let start = new Date(this.min);
    // let end   = new Date(this.max);

    // return arr.filter(item => {
    //   let date = new Date(item.created_at);
    //   return date >= start && date <= end;
    // }

  }
  
}
