import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service'
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/product.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];


  constructor(
    // inyectamos el servicio para poder suscribir a nav al observable
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    // con estas lineas nav se esta suscribiendo al observable mycart de esa forma cada que haya un cambio este lo va a notificar
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    // meto aca el metodo para que apenas arranque el servidor sea lo primero que me renderice
    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  // login() {
  //   this.authService.loginAndGetProfile('andresito@mail.com', '12345')
  //   .subscribe({
  //     next: data => {
  //       this.token = 'Todo: validar'
  //       this.profile = data;
  //     }
  //   })
  // }
  login() {
    this.authService.loginAndGetProfile('andres@mail.com', '12345')
    .subscribe(user => {
      this.profile = user;
    });
  }

  // getProfile() {
  //   this.authService.profile(this.token)
  //   .subscribe(user => {
  //     this.profile = user;
  //   })
  // }
  getAllCategories() {
    this.categoriesService.getAll()
    .subscribe( data => {
      this.categories = data;
    })
  }

}
