import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerousDrugsListComponent } from './dangerous-drugs-list.component';

describe('DangerousDrugsListComponent', () => {
  let component: DangerousDrugsListComponent;
  let fixture: ComponentFixture<DangerousDrugsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangerousDrugsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangerousDrugsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
