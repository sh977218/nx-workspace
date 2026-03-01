import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  Injectable,
  provideZonelessChangeDetection,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  provideRouter,
  RouterStateSnapshot,
  TitleStrategy,
  withComponentInputBinding,
} from '@angular/router';
import { provideNgtRenderer } from 'angular-three/dom';
import Highcharts from 'highcharts';
import { provideHighcharts } from 'highcharts-angular';

import { appRoutes } from './app.routes';

@Injectable({ providedIn: 'root' })
class TemplatePageTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);

  constructor() {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    this.title.setTitle(`${title ? title : 'NX Workspace'}`);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideNgtRenderer(),
    provideHighcharts({
      instance: () => Promise.resolve(Highcharts),

      // Global chart options applied across all charts
      options: {
        title: {
          style: {
            color: 'tomato',
          },
        },
        legend: {
          enabled: false,
        },
      },

      // Include Highcharts additional modules (e.g., exporting, accessibility) or custom themes
      modules: () => [
        import('highcharts/esm/modules/accessibility'),
        import('highcharts/esm/modules/exporting'),
        import('highcharts/esm/themes/sunset'),
      ],
    }),
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
  ],
};
