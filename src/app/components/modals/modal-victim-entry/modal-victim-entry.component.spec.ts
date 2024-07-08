import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVictimEntryComponent } from './modal-victim-entry.component';

describe('ModalVictimEntryComponent', () => {
  let component: ModalVictimEntryComponent;
  let fixture: ComponentFixture<ModalVictimEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVictimEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVictimEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
