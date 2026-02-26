import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { LocalStorageService } from './services/local-storage.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _localStorageService = inject(LocalStorageService);
  const authToken = _localStorageService.getItem('jwt');
  // Clone the request and add the Authorization header
  if (authToken) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(clonedRequest);
  }
  return next(req);
};
