import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesDetailsComponent } from './houses-details.component';

describe('HousesDetailsComponent', () => {
  let component: HousesDetailsComponent;
  let fixture: ComponentFixture<HousesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
