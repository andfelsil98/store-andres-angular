import { Component } from '@angular/core';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // esta es la informacion que envia el padre al hijo
  imgParent = 'https://i.picsum.photos/id/755/200/200.jpg?hmac=fgsDUz8GLl3UPtHhHlMIabU9V8LhbOPCwYGzrrn6CyU';
  products: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      image: './assets/images/toy.webp',
      price: 100
    },
    {
      id: '2',
      name: 'Product 2',
      image: './assets/images/toy.webp',
      price: 100
    },
    {
      id: '3',
      name: 'Product 3',
      image: './assets/images/toy.webp',
      price: 100
    },
    {
      id: '4',
      name: 'Product 4',
      image: './assets/images/toy.webp',
      price: 100
    }

  ];

  onLoaded(img: string) {
    console.log('log padre', img);
  };
};
