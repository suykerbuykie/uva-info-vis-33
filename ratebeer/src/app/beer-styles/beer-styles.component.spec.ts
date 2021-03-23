import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerStylesComponent } from './beer-styles.component';

describe('BeerStylesComponent', () => {
  let component: BeerStylesComponent;
  let fixture: ComponentFixture<BeerStylesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerStylesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
