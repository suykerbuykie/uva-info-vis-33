import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerFlavorSpiderComponent } from './beer-flavor-spider.component';

describe('BeerFlavorSpiderComponent', () => {
  let component: BeerFlavorSpiderComponent;
  let fixture: ComponentFixture<BeerFlavorSpiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerFlavorSpiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerFlavorSpiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
