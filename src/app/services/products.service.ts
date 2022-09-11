import { Injectable } from '@angular/core';
// para usar http hay que importar el modulo en app.module.ts y luego importarlo donde se vaya a usar
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http'
import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model'
import { retry, catchError, map } from 'rxjs/operators';
import { throwError, zip } from 'rxjs';
import { environment } from '../../environments/environment';
import { isNgTemplate } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/api/products` //se usa los ambientes para evitar problemas de CORS (problema con los dominios) cuando se pase de ambiente de desarrollo a un ambiente productivo. para ambiente de desarrollo se creo un proxy (proxy.config.json) para cambiar le origen de los dominios a nuestro dominio y evitar ese provlema. para prod no se puede igual por tanto en el archivo environment.prod.ts se pone la url del dominio de interes para evitar estos conflictos
  constructor(
    // como el modulo http es un servicio lo declaro en el constructor y lo pongo privado
    private http: HttpClient
  ) { }

// PROGRAMA PARA OBTENER LA INFORMACION DE UNA API

// puedo separar el hecho de mostrar todos los productos o mostrarlos de 10 en 10 sin embargo esto se puede hacer en un solo metodo de la siguiente forma. donde se puede ver que primero se pone como parametro opcional limit y offset y por otro lado se usa el httpparams para organizar la logica
  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    // se hace el get o la peticion a la url de interes en este caso fake api
    return this.http.get<Product[]>(this.apiUrl, { params })
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
        ...item,
        taxes: .19 *item.price
        }
      })) //map sirve para transformar los valores que lleguen del observable. ahora internamente ya con la data se quiere aplicar el map nativo de js
    );// con el pipe logro hacer reintento de get a la url 3 veces en este caso esto se puede reintentar las veces que se requieran
  }

// metodo zip para poder ejecutar mas de un observable al tiempo
  fetchReadAndUpdate(id:string, dto: UpdateProductDTO) {
    return zip(
      this.getProduct(id),
      this.update(id, dto)
    )
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError(() => new Error('Algo esta fallando en el server'));
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => new Error('El producto no existe'));
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError(() => new Error('No estas autorizado'));
        }
        return throwError(() => new Error('Ups algo salio mal'));
      })
    )
  }
  // mostrando elementos de 10 en 10

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`,  { params: { limit, offset }
  })
  .pipe(
    retry(3)
  );
  }
// el hecho de usar los dto y los omit es por ejemplo en este caso que voy a enviar cierta informacion y otra no pero si voy a recibir de vuelta toda la informacion
  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }
// los put funcionan como los get debo especificarle el id para saber que elemento quiero modificar
  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean> (`${this.apiUrl}/${id}`);
  }
}
