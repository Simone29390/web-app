import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseExpiredComponent } from './showcase-expired.component';

describe('ShowcaseExpiredComponent', () => {
  let component: ShowcaseExpiredComponent;
  let fixture: ComponentFixture<ShowcaseExpiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcaseExpiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
