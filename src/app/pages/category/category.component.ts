import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-category',
  template: `<app-products [products]="products" [productId]="productId" (loadMore)="loadMore()"></app-products>`,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];

  productId: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.loadMore();


    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
      console.log(this.productId);
    })
    //con estas lineas lo que estoy configurando es el id que va a tener el path de categories. inicialmente se configura en app routing y luego se genera esta logica en categories en la cual el id que me ponga en la url lo voy a poder capturar y dejar en una variable
    this.route.paramMap
    .pipe(
      switchMap(params => { //usando switchmap para evitar el callback hell recordar que en vez de varios suscribe uso returns y un solo suscribe al final
        this.categoryId = params.get('id');
        if(this.categoryId){
          return this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
        } return [];

      })
    ).subscribe(data => {
      this.products = data;
    })
  }


  loadMore() {
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }




}
