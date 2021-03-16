import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerExplorerComponent } from './beer-explorer.component';

describe('BeerExplorerComponent', () => {
  let component: BeerExplorerComponent;
  let fixture: ComponentFixture<BeerExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerExplorerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
