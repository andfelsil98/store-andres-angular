import { Component } from '@angular/core';
import { Product } from './models/product.model';
// import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // esta es la informacion que envia el padre al hijo
  imgParent = 'https://i.picsum.photos/id/755/200/200.jpg?hmac=fgsDUz8GLl3UPtHhHlMIabU9V8LhbOPCwYGzrrn6CyU';
  showImg = true;
  token = '';
  imgRta = '';

  constructor(
    // private authService: AuthService,
    private usersService: UsersService,
    private fileService: FilesService
  ) { }

  onLoaded(img: string) {
    console.log('log padre', img);
  };

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService.create({
      name:'Andres',
      email: 'andres@mail.com',
      password: '12345'
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }

  // login() {
  //   this.authService.login('andres@mail.com', '12345')
  //   .subscribe(rta => {
  //     console.log(rta.access_token);
  //     this.token = rta.access_token;
  //   });
  // }

  // getProfile() {
  //   this.authService.profile(this.token)
  //   .subscribe(profile => {
  //     console.log(profile);
  //   })
  // }
  downloadPdf() {
    this.fileService.getFile('my.pdf','https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.fileService.uploadFile(file)
      .subscribe( rta => {
      this.imgRta = rta.location;
    })
    }
};
}
