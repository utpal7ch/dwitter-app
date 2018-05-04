import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DweetDialogComponent } from './dweet-dialog.component';

describe('DweetDialogComponent', () => {
  let component: DweetDialogComponent;
  let fixture: ComponentFixture<DweetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DweetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DweetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
