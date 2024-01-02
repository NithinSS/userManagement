import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimations(), provideNoopAnimations(), provideStore(reducers, { metaReducers }), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
