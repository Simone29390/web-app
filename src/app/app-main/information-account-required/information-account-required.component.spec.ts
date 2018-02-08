import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationAccountRequiredComponent } from './information-account-required.component';

describe('InformationAccountRequiredComponent', () => {
  let component: InformationAccountRequiredComponent;
  let fixture: ComponentFixture<InformationAccountRequiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationAccountRequiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationAccountRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
