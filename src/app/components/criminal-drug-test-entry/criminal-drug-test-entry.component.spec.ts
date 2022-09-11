import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriminalDrugTestEntryComponent } from './criminal-drug-test-entry.component';

describe('CriminalDrugTestEntryComponent', () => {
  let component: CriminalDrugTestEntryComponent;
  let fixture: ComponentFixture<CriminalDrugTestEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriminalDrugTestEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriminalDrugTestEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
