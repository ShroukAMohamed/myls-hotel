import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private _MessageService: MessageService,
    private _TranslateService: TranslateService
  ) { }

  public success(header: string, message: string) {
    this._MessageService.add({ severity: 'success', summary: this._TranslateService.instant(header), detail: this._TranslateService.instant(message) });
  }

  public error(header: string, message: string) {
    this._MessageService.add({ severity: 'error', summary: this._TranslateService.instant(header), detail: this._TranslateService.instant(message) });
  }

  public warning(header: string, message: string) {
    this._MessageService.add({ severity: 'warn', summary: this._TranslateService.instant(header), detail: this._TranslateService.instant(message) });
  }

}
