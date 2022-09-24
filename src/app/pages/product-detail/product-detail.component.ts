import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Location } from '@angular/common';

// services
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  product: Product | null = null;


  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    // this.loadMore();
    //con estas lineas lo que estoy configurando es el id que va a tener el path de categories. inicialmente se configura en app routing y luego se genera esta logica en categories en la cual el id que me ponga en la url lo voy a poder capturar y dejar en una variable
    this.route.paramMap
    .pipe(
      switchMap(params => { //usando switchmap para evitar el callback hell recordar que en vez de varios suscribe uso returns y un solo suscribe al final
        this.productId = params.get('id');
        if(this.productId){
          return this.productsService.getProduct(this.productId);
        } return [null];

      })
    ).subscribe(data => {
      this.product = data;
    })
  }

  goToBack() {
    this.location.back();
  }

}
