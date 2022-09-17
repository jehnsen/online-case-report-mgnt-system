import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriminalDrugTestViewComponent } from './criminal-drug-test-view.component';

describe('CriminalDrugTestViewComponent', () => {
  let component: CriminalDrugTestViewComponent;
  let fixture: ComponentFixture<CriminalDrugTestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriminalDrugTestViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriminalDrugTestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
