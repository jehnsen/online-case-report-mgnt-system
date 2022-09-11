import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriminalDrugTestListComponent } from './criminal-drug-test-list.component';

describe('CriminalDrugTestListComponent', () => {
  let component: CriminalDrugTestListComponent;
  let fixture: ComponentFixture<CriminalDrugTestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriminalDrugTestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriminalDrugTestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
