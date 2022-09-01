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
  showImg = true;


  onLoaded(img: string) {
    console.log('log padre', img);
  };

  toggleImg() {
    this.showImg = !this.showImg;
  }
};
