import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs'; //nos deja correr un proceso sin necesidad de cambiar lo que nos envie el observable

// lineas para crear un contexto y de esta forma hacer que se ejecute el interceptor o no en partes especificas. es deicr si el CHECK_TIME esta en false significa que para ejecutar dicho interceptor hay que ponerle su contexto a la parte que quiero que lo ejecute. si es true entonces en donde ponga el contexto no se va a ejecutar el interceptor pero si en el resto. si no pongo contexto este se va a ejecutar en todos lados
const CHECK_TIME = new HttpContextToken<boolean>(() => false);
export function checkTime() {
  return new HttpContext().set(CHECK_TIME, true)
}

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}
  // este interceptor lo que hace es evaluar el tiempo que demora en responder el observable que mande
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_TIME)){
      const start = performance.now(); //me sirve para evaluar el tiempo inicial. es decir el tiempo en el que empezo
      return next
      .handle(request)
      .pipe(
        tap( () => {
          const time = (performance.now() - start) + 'ms'; //aqui estoy sacando el tiempo que demora el proceso restando el tiempo en el que el observable me responde y el tiempo en el que empiezo a ejecutarlo
          console.log(request.url, time);
        })
      );
    }
    return next.handle(request);
  }
}
