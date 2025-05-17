import { Component } from '@angular/core';
import { HeaderSectionComponent } from "../../components/header-section/header-section.component";
import { HousesSectionComponent } from "../../components/houses-section/houses-section.component";
import { ContactSectionComponent } from "../../components/contact-section/contact-section.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeaderSectionComponent, ContactSectionComponent, HousesSectionComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
