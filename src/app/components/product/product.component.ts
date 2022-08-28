import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  // hago uso de las interfaces para especificar que quiero en mis objetos de tipo product
  @Input() product: Product = {
    id: '',
    name: '',
    image: '',
    price: 0
  }


  constructor() {
  }

  ngOnInit(): void {
  }

}
