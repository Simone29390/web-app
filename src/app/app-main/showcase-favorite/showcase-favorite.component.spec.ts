import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseFavoriteComponent } from './showcase-favorite.component';

describe('ShowcaseFavoriteComponent', () => {
  let component: ShowcaseFavoriteComponent;
  let fixture: ComponentFixture<ShowcaseFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcaseFavoriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
