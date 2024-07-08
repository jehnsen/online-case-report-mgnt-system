import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VictimListComponent } from './victim-list.component';

describe('VictimListComponent', () => {
  let component: VictimListComponent;
  let fixture: ComponentFixture<VictimListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VictimListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VictimListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
