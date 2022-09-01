import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service'
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  constructor(
    // inyectamos el servicio para poder suscribir a nav al observable
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    // con estas lineas nav se esta suscribiendo al observable mycart de esa forma cada que haya un cambio este lo va a notificar
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }


}
