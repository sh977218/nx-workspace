import { HttpInterceptorFn } from '@angular/common/http';


export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
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
