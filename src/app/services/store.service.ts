import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
// dependencia que me permite manipular todo lo que tiene que ver con reactividad.
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private myShoppingCart: Product[] = [];
  // creo una instancia para el behavior subject
  private myCart = new BehaviorSubject<Product[]>([]);
  // creamos un observable se identifica con el signo $, de esta forma siempre esta pendiente a los cambios. los que se suscriban a ese observable podran capturar la informacion que tome el observable
  myCart$ = this.myCart.asObservable();

  constructor() { }

  addProduct(product: Product) {
    this.myShoppingCart.push(product);
    // con estas lineas se esta transmitiendo el estado de la lista myshoppingcart a los que esten interesados en recibirla
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }

  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0)
  }
}
