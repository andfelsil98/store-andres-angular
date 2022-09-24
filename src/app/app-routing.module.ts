import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CategoryComponent } from './pages/category/category.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';


const routes: Routes = [
  {//para el caso en que quiera que se cargue por defecto el home con la ruta 'home' y no '' hay que crear estas lineas para redirigir el path '' al path 'home'
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  // {//si quiero no redirigir sino de una ir al path '' se hace de esta forma
  //   path: '',
  //   component: HomeComponent
  // },
  {//en este caso estoy diciendo que cuando este en el path category me renderice el component category
    path: 'category/:id',
    component: CategoryComponent
  },
  {
    path:'product/:id',
    component: ProductDetailComponent
  },
  {
    path: 'mycart',
    component: MycartComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'recovery',
    component: RecoveryComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {//la ruta del not found tiene que ser la ultima que se declare en los paths o sino puede salir erorres
    path:'**',
    component: NotFoundComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
