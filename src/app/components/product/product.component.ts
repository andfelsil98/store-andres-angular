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
    image: '',
    price: 0,
    category: '',
    description: ''
  }

  @Output() addedProduct = new EventEmitter<Product>();

  constructor() {
  }

  // ngOnInit(): void {
  // }

  onAddToCart() {
    this.addedProduct.emit(this.product)
  }

}
