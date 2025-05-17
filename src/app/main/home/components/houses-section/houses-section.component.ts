import { Component } from '@angular/core';
import { RoomsService } from '../../../admin/services/rooms.service';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'houses-section',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './houses-section.component.html',
  styleUrl: './houses-section.component.scss'
})
export class HousesSectionComponent {
  rooms: any[] = [];
  constructor(private roomsService: RoomsService, public _TranslateService: TranslateService) { }
  public getRooms() {
    this.roomsService.getAllRooms().then((data) => {
      this.rooms = data || [];
    });
  }

  ngOnInit() {
    this.getRooms();
  }
}
