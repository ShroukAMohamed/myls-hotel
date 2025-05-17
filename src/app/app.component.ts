import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PlatformService } from './shared/services/platform.service';
import { ChangeLanguagesService } from './shared/services/changeLanguages.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private _TranslateService: TranslateService,
    public _PlatformService: PlatformService,
    private _Router: Router,
    private _ChangeLanguagesService: ChangeLanguagesService
  ) {
    //  TRANSLATE CONFIGS
    this._TranslateService.addLangs(['en', 'ar']);
    this._TranslateService.setDefaultLang('en');
    this._TranslateService.use('en');

    _TranslateService.getTranslation('en').subscribe();
    _TranslateService.getTranslation('ar').subscribe();
    // ====================================================
    if (_PlatformService.isBrowser()) {
      this._Router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const routerLang = ['en', 'ar'].includes(event.url.split('/')[1]) ?
            event.url.split('/')[1] : 'en';
          if (routerLang === 'ar') {
            this._TranslateService.use('ar');
          } else {
            this._TranslateService.use('en');
          }
          this._ChangeLanguagesService.changeLanguage(routerLang);
        }
      })
    }
  }
}
