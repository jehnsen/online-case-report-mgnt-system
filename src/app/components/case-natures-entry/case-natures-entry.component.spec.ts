import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseNaturesEntryComponent } from './case-natures-entry.component';

describe('CaseNaturesEntryComponent', () => {
  let component: CaseNaturesEntryComponent;
  let fixture: ComponentFixture<CaseNaturesEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseNaturesEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseNaturesEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
