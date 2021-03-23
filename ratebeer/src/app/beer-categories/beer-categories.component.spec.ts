import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerCategoriesComponent } from './beer-categories.component';

describe('BeerCategoriesComponent', () => {
  let component: BeerCategoriesComponent;
  let fixture: ComponentFixture<BeerCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
