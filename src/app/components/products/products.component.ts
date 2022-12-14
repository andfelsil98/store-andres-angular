import { Component, Input, Output, EventEmitter } from '@angular/core';
import { switchMap } from 'rxjs';
import { zip } from 'rxjs';
import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service'
import { isThisISOWeek } from 'date-fns';



// UN COMPONENTE SOLO DEBE CONTENER LOGICA Y ESTADO RELACIONADO CON LA PRESENTACION
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent{
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
  // limit = 10;
  // offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  @Output() loadMore: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  set productId(id: string | null) {
    if(id){
      this.onShowDetail(id);
    }
  }

  @Input () products: Product[] = [
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

  //ngOnInit(): void {
    // aqui se procesa los procesos asincronos en este caso la peticion http
    // esta linea es si quiero traer todos los productos
    // this.productsService.getAllProducts()
    // esta linea es si quiero traer un numero especifico de productos
  //   this.productsService.getProductsByPage(10,0)
  //   .subscribe(data => { //para poder estar pendiente de cuando me entrega la informacion la api, puedo usar los conceptos de observables y suscriptores. en este caso el suscriptor lo que hace es suscribirse a dicha api y se va a quedar observando apenas exista informacion nueva la va a capturar y la enviara a nosotros.
  //     this.products = data;

  //   });
    //this.loadMore();
  //};

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
    this.statusDetail = 'loading';
    // this.productsService.getProduct(id)
    // METODO DEPRECADO ES DECIR YA NO ES EL MAS OPTIMO
    // .subscribe (data => {
    //   this.toggleProductDetail();
    //   this.productChosen = data;
    //   this.statusDetail = 'success';
    // }, error => {
    //   console.error(error);
    //   this.statusDetail = 'error';
    // })
    //METODO ACTUAL
    // this.toggleProductDetail();
    if(!this.showProductDetail){
      this.showProductDetail = true;
    }
    this.productsService.getProduct(id)
    .subscribe({
      next: (data) => this.showDetailOk(data),
      error: (error) => this.showDetailError(error),
      complete: () => console.info("complete")
    });
  }

  showDetailOk(data: Product) {
    this.statusDetail = "success";
    console.log("producto Obtenido", data);
    this.productChosen = data;
  }

  showDetailError(error: any) {
    this.statusDetail = "error";
    window.alert(error);
  }


  readAndUpdate (id: string) {
    // esto tambien se puede enviar a los servicios para poder reusarlo
    this.productsService.getProduct(id) //forma para evitar el callback hell con observables. se pone importa switch map de rxjs luego se pone .pipe se usa la palabra switchmap y con ello se puede empezar a ejecutar una instruccion por una donde la cantidad que se ponga es la que se va a ejecutar una despues de la otra. finalmente se pone solo un subscribe que tendra la respuesta final con la cual hago algo
    .pipe(
      switchMap((product) => this.productsService.update(product.id, {title: 'change'})),
      )
    .subscribe (data => {
      console.log(data);
    });
    // .subscribe (data => {
    //   const product = data;
    //   this.productsService.update(product.id, {title: 'change'})
    //   .subscribe(rtaUpdate => {
    //     console.log(rtaUpdate);
    //   })
    // })

    // si quiero tener la respuesta de dos observables al tiempo utilizo zip importando zip de rxjs pongo los que necesito dentro de zip y posteriormente uso el subscribe y ahi puedo de inmediato saber las respuestas de ambos procesos. este proceso es  mejor manejarlo desde los servicios para poder reusarlo en mas componentes. este cambio ya esta en los servicios
    this.productsService.fetchReadAndUpdate(id, {title: 'change'})
    .subscribe(response => {
      const product = response[0];
      const update = response[1];
    })

  }


  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'Esta es una descripcion',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 200,
      categoryId: 2,
    }
    this.productsService.create(product)
    .subscribe( data => {
      console.log(`created: ${data}`);
      this.products.unshift(data);
    })
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'nuevo titulo'
    }
    const id = this.productChosen.id; //id del producto que esta seleccionado en ese momento
    this.productsService.update(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex ( item => item.id === this.productChosen.id)
      this.products[productIndex] = data;
      this.productChosen = data;
    })
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe (() => {
      const productIndex = this.products.findIndex ( item => item.id === this.productChosen.id)
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }
  // esta funcion me esta tomando como referencia los limites y el offset inicial para que a partir de ahi me cargue los demas elementos de 10 en 10. entonces por medio de un boton voy cargando mas y mas elementos de 10 en 10
  // loadMore() {
  //   this.productsService.getProductsByPage(this.limit, this.offset)
  //   .subscribe(data => {
  //     this.products = this.products.concat(data);
  //     this.offset += this.limit;
  //   });
  // }

  OnLoadMore() { //estoy emitiendo un evento que se llama loadmore que lo que transmite es un evento de click como un output, este lo toma el home como un event biding y lo asigna al metodo llamado load more en home.component.ts
    this.loadMore.emit();
  }

}
