import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSuspectEntryComponent } from './modal-suspect-entry.component';

describe('ModalSuspectEntryComponent', () => {
  let component: ModalSuspectEntryComponent;
  let fixture: ComponentFixture<ModalSuspectEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSuspectEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSuspectEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
