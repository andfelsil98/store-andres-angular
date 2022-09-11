import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  // hago uso de las interfaces para especificar que quiero en mis objetos de tipo product
  @Input() product: Product = {
    id: '',
    title: '',
    images: [],
    price: 0,
    category: {
      id: '',
      name:''
    },
    description: '',

  }
  // output para enviar algo desde el hijo al padre

  @Output() addedProduct = new EventEmitter<Product>(); //va a emitir un nuevo evento que va a contener un elemento de tipo product
  @Output() showProduct = new EventEmitter<string>();//va a emitir un nuevo evento que va a contener un elemento de tipo string

  constructor() {
  }

  // ngOnInit(): void {
  // }

  onAddToCart() {
    this.addedProduct.emit(this.product)
  }

  onShowDetail() {
    this.showProduct.emit(this.product.id);//aqui es donde se especifica que elemento se va a transmitir en este caso el id del product que es un string
  }

}
