import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseActiveComponent } from './showcase-active.component';

describe('ShowcaseActiveComponent', () => {
  let component: ShowcaseActiveComponent;
  let fixture: ComponentFixture<ShowcaseActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcaseActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
