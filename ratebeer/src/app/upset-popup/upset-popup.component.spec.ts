import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsetPopupComponent } from './upset-popup.component';

describe('UpsetPopupComponent', () => {
  let component: UpsetPopupComponent;
  let fixture: ComponentFixture<UpsetPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsetPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsetPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
