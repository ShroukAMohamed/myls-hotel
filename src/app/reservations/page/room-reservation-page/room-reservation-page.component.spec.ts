import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomReservationPageComponent } from './room-reservation-page.component';

describe('RoomReservationPageComponent', () => {
  let component: RoomReservationPageComponent;
  let fixture: ComponentFixture<RoomReservationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomReservationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomReservationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
