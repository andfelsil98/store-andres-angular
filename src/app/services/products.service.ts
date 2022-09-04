import { Injectable } from '@angular/core';
// para usar http hay que importar el modulo en app.module.ts y luego importarlo donde se vaya a usar
import { HttpClient } from '@angular/common/http'
import { Product } from './../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products'
  constructor(
    // como el modulo http es un servicio lo declaro en el constructor y lo pongo privado
    private http: HttpClient
  ) { }

// PROGRAMA PARA OBTENER LA INFORMACION DE UNA API
  getAllProducts() {
    // se hace el get o la peticion a la url de interes en este caso fake api
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
  }
}
