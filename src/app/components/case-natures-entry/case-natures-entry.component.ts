import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-case-natures-entry',
  templateUrl: './case-natures-entry.component.html',
  styleUrls: ['./case-natures-entry.component.css']
})
export class CaseNaturesEntryComponent implements OnInit {

  formData: FormGroup;
  categories: any = [];
  isLoading: boolean = false;
  p: number = 1;
  constructor(private fbuilder: FormBuilder, private categoryService: CategoryService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.clearFields();
    this.getCategories();
  }

  onSubmit(){
    this.isLoading = true;
    if(!this.formData.value.categoryDescription) {
      this.toastrService.warning("Field is required!");
      this.isLoading = false;
      return;
    }
    
    this.categoryService.create(this.formData.value).subscribe((response: any) => {
      if(response.data) {
        this.getCategories();
        this.clearFields();
        this.toastrService.success("Successfully saved to database!");
      } else {
        this.toastrService.error("Issue encountered while saving to database.");
      }
      this.isLoading = false;
    }, err => this.toastrService.error(err))
  }

  getCategories(){
    this.categoryService.get().subscribe((response: any) => {
      if(response.data) {
        this.categories = response.data;
      }
    }, err => this.toastrService.error(err))
  }

  onDelete(id: number){
    this.categoryService.delete(id).subscribe((response: any) => {
      if(response.data) {
        this.getCategories();
        this.toastrService.warning("Deleted from database!");
      }
    }, err => this.toastrService.error(err))
  }

  clearFields():void {
    this.formData = this.fbuilder.group({ 'categoryDescription': [''], 'division': [''] })
  }

  getClass(value) {

    return {
      'badge': true,
      'text-wrap': true,
      'bg-maroon': value === 'soco',
      'bg-indigo': value === 'physical',
      'bg-teal': value === 'chemistry',
      'bg-fuchsia': value === 'fingerprint',
      'bg-purple': value === 'ballistic',
      'bg-lightblue': value === 'photography'
    }

  }

}
