import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DweetComponent } from './dweet.component';

describe('DweetComponent', () => {
  let component: DweetComponent;
  let fixture: ComponentFixture<DweetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DweetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
