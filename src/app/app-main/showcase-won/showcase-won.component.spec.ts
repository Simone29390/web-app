import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseWonComponent } from './showcase-won.component';

describe('ShowcaseWonComponent', () => {
  let component: ShowcaseWonComponent;
  let fixture: ComponentFixture<ShowcaseWonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcaseWonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseWonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
