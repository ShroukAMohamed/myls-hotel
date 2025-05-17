import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, ContentComponent, FooterComponent, ToastModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(public _Router: Router, public _TranslateService: TranslateService) { }
}
