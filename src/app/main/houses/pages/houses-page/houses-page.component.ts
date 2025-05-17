import { Component } from '@angular/core';
import { HousesDetailsComponent } from "../../components/houses-details/houses-details.component";

@Component({
  selector: 'houses-page',
  standalone: true,
  imports: [HousesDetailsComponent],
  templateUrl: './houses-page.component.html',
  styleUrl: './houses-page.component.scss'
})
export class HousesPageComponent {

}
