import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRequestingPartiesComponent } from './modal-requesting-parties.component';

describe('ModalRequestingPartiesComponent', () => {
  let component: ModalRequestingPartiesComponent;
  let fixture: ComponentFixture<ModalRequestingPartiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRequestingPartiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRequestingPartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
