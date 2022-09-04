import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service'
import { isThisISOWeek } from 'date-fns';

// UN COMPONENTE SOLO DEBE CONTENER LOGICA Y ESTADO RELACIONADO CON LA PRESENTACION
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  // podemos aislar todo lo que tiene que ver con la logica de negocio a nivel de programacion en los servicios. en este caso pasaremos toda la logica del shopping cart al archivo store services.ts
  myShoppingCart: Product[] = [];
  total = 0;
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    title: '',
    images: [],
    price: 0,
    category: {
      id: '',
      name:''
    },
    description: ''
  }

  products: Product[] = [
    // {
    //   id: '1',
    //   name: 'Product 1',
    //   image: './assets/images/toy.webp',
    //   price: 100
    // },
    // {
    //   id: '2',
    //   name: 'Product 2',
    //   image: './assets/images/toy.webp',
    //   price: 100
    // },
    // {
    //   id: '3',
    //   name: 'Product 3',
    //   image: './assets/images/toy.webp',
    //   price: 100
    // },
    // {
    //   id: '4',
    //   name: 'Product 4',
    //   image: './assets/images/toy.webp',
    //   price: 100
    // },
    // {
    //   id: '4',
    //   name: 'Product 4',
    //   image: './assets/images/toy.webp',
    //   price: 100
    // }

  ];
  today = new Date();
  date = new Date(2021,1,21);

  constructor(
    // luego se hace una inyeccion de dependencias para poder usar lo que se traslado al archivo store.service aca

    private storeService: StoreService,
    private productsService: ProductsService // hay una inyeccion de un servicio a este componente (para este caso http) por tanto lo declaro en el constructor del componente. al ser un proceso asincrono la peticion esta se va a solicitar fuera del constructor ya que este no procesa procesos asincronos
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    // aqui se procesa los procesos asincronos en este caso la peticion http
    this.productsService.getAllProducts()
    .subscribe(data => { //para poder estar pendiente de cuando me entrega la informacion la api, puedo usar los conceptos de observables y suscriptores. en este caso el suscriptor lo que hace es suscribirse a dicha api y se va a quedar observando apenas exista informacion nueva la va a capturar y la enviara a nosotros.
      this.products = data;
    });
  };

  onAddToShoppingCart( product: Product) {
    // se ha delegado a services agregar productos y sumar el total de los productos. aqui solo se llaman los metodos que se implementaron alli
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
    // this.myShoppingCart.push(product);
    // esta parte del codigo me suma los elementos de mi lista de objetos
    // this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0)
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.productsService.getProduct(id)
    .subscribe (data => {
      this.toggleProductDetail();
      this.productChosen = data;
    })
  }

}
