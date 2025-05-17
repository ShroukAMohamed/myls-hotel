import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Menu } from 'primeng/menu';
import { DOCUMENT, NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../main/auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule, ButtonModule, TranslateModule, RouterLink, Menu, NgIf, NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public visible: boolean = false;
  public items: MenuItem[] | undefined = [];
  public menuItems: MenuItem[] | undefined = [];
  public currentLang: string;
  public isLogin: boolean = false;
  public isAdmin: boolean = false;
  public localStore: any

  private unsubscribe: Subject<void> = new Subject<void>();
  constructor(
    public _TranslateService: TranslateService,
    private _Router: Router,
    @Inject(DOCUMENT) private document: Document,
    public AuthService: AuthService
  ) {

    this._TranslateService.onLangChange.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.initItems();
    });
    this.currentLang = this._TranslateService.currentLang;
  }

  ngOnInit(): void {
    this.localStore = (this.document as Document).defaultView?.localStorage;
    const storedToken = this.localStore?.getItem('userToken');
    this.AuthService.token.next(storedToken);
    this.isLogin = storedToken !== null;
    this.AuthService.token.subscribe((token: any) => {
      this.isLogin = token !== null;
    });
    // const storeUid = this.localStore?.getItem('uid');
    // this.AuthService.uid.next(storeUid);
    // this.AuthService.uid.subscribe((uid: any) => {
    //   this.isAdmin = uid !== null;
    // });
    this.initItems();
  }

  public initItems(): void {
    this.items = [
      {
        label: this._TranslateService.instant("_Home.navbar.home"),
        routerLink: ['/' + this._TranslateService.currentLang],
      },
      {
        label: this._TranslateService.instant("_Home.navbar.houses"),
        routerLink: ['/', this.currentLang, 'houses'],
      },
      {
        label: this._TranslateService.instant("_Home.navbar.contact"),
        routerLink: ['/', this.currentLang, 'contact-us'],
      },
      {
        label: this._TranslateService.instant("_Home.navbar.adminPanel"),
        routerLink: ['/', this.currentLang, 'admin'],
      },
    ]

    this.menuItems = [
      {
        label: 'Options',
        items: [
          {
            label: 'Logout',
            icon: 'pi pi-left',
            command: () => this.logout(),
          },
        ]
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

  public logout(): void {
    this.AuthService.logOut();
  }
}
