import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerousDrugsEntryComponent } from './dangerous-drugs-entry.component';

describe('DangerousDrugsEntryComponent', () => {
  let component: DangerousDrugsEntryComponent;
  let fixture: ComponentFixture<DangerousDrugsEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangerousDrugsEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangerousDrugsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
