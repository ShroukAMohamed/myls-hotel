import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeLanguagesService {

  constructor(
    private _TranslateService: TranslateService,
    private _Router: Router,
  ) { }

  public changeLanguage(lang: string, redirectToNewLang: boolean = true) {
    const currentLang: string = this._TranslateService.currentLang;
    this._TranslateService.use(lang);
    const newUrl: string = this._Router.url.replace(`/${currentLang}/`, `/${lang}/`);
    const direction = lang === 'ar' ? 'rtl' : 'ltr';

    if (redirectToNewLang) {
      this._Router.navigateByUrl(newUrl);
    }
    localStorage.setItem('lang', lang);

    this.changeDirection(direction);
  }

  public changeDirection(direction: string) {
    document.querySelector('html')!.setAttribute('direction', direction);
    document.querySelector('html')!.setAttribute('dir', direction);

    document.querySelector('html')!.style.direction = direction;
    document.querySelector('html')!.setAttribute('lang', direction === 'rtl' ? 'ar' : 'en');

    document.querySelector('body')!.setAttribute('direction', direction);
    document.querySelector('body')!.style.direction = direction;
  }
}
