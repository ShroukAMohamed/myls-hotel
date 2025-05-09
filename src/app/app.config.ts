import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { BrowserModule, provideClientHydration, withI18nSupport } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { env } from '../env/env';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { MessageService } from 'primeng/api';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./i18n/", ".json");
}
export const appConfig: ApplicationConfig = {
  providers: [MessageService, AngularFireAuthModule, provideZoneChangeDetection({ eventCoalescing: true }), BrowserAnimationsModule, provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch()), HttpClientModule, importProvidersFrom(
    BrowserModule.withServerTransition({
      appId: 'myls-public-gui'
    }),
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }
    )
  ),
    // Initialize Firebase
    provideClientHydration(withI18nSupport()), provideFirebaseApp(() => initializeApp(env.firebaseConfig)),
    { provide: FIREBASE_OPTIONS, useValue: env.firebaseConfig },
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ]
};
