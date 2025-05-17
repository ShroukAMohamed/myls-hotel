import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'header-section',
  standalone: true,
  imports: [
    CarouselModule,
    TranslateModule
  ],
  templateUrl: './header-section.component.html',
  styleUrl: './header-section.component.scss'
})
export class HeaderSectionComponent {
  images = [
    {
      src: 'images/pexels-asadphoto-3319961.jpg',
      alt: 'Image 1'
    },
    {
      src: 'images/pexels-asadphoto-12858509.jpg',
      alt: 'Image 2'
    },
    {
      src: 'images/pexels-asadphoto-28843907.jpg',
      alt: 'Image 3'
    }
  ];
}
