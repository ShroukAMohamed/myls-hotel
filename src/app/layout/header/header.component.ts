import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule, ButtonModule, TranslateModule, RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public visible: boolean = false;
  public items: MenuItem[] | undefined = [];
  public currentLang: string;
  private unsubscribe: Subject<void> = new Subject<void>();
  constructor(
    public _TranslateService: TranslateService,
    private _Router: Router
  ) {

    this._TranslateService.onLangChange.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.initItems();
    });
    this.currentLang = this._TranslateService.currentLang;
  }

  ngOnInit(): void {
    this.initItems();
  }

  public initItems(): void {
    this.items = [
      {
        label: this._TranslateService.instant("_Home.navbar.home"),
        routerLink: ['/' + this._TranslateService.currentLang],
      },
      {
        label: this._TranslateService.instant("_Home.navbar.about"),
        routerLink: ['/', this.currentLang, 'about-us'],
      },
      // {
      //   label: this._TranslateService.instant("_Home.Price"),
      //   // routerLink: '/',
      // },
      // {
      //   label: this._TranslateService.instant("_Home.Industries"),
      //   // routerLink: '/',
      // },
      {
        label: this._TranslateService.instant("_Home.navbar.contact"),
        routerLink: ['/', this.currentLang, 'contact-us'],
      },
    ]
  }

  public changeLang(): void {
    const currentLang = this._TranslateService.currentLang;
    this._TranslateService.use(currentLang === 'ar' ? 'en' : 'ar');
    const newUrl: string[] = this._Router.url.split('/');
    newUrl[1] = currentLang === 'ar' ? 'en' : 'ar';
    this._Router.navigate(newUrl);
  }
}
