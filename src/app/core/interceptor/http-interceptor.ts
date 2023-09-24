import { HttpInterceptorFn } from "@angular/common/http";

export const HttpInterceptorService: HttpInterceptorFn = (req, next) => {
  return next(req)
}