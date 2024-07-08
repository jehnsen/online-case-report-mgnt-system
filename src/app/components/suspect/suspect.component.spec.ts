import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspectComponent } from './suspect.component';

describe('SuspectComponent', () => {
  let component: SuspectComponent;
  let fixture: ComponentFixture<SuspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
