import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionDetailsComponent } from './insertion-details.component';

describe('InsertionDetailsComponent', () => {
  let component: InsertionDetailsComponent;
  let fixture: ComponentFixture<InsertionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
