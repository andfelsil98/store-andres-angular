import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  // Para enviar información de padre a hijo, puedes utilizar el decorador @Input() para marcar una propiedad de una clase como punto de entrada de un dato. en este caso el componente hijo es img el componente padre es app
  @Input() img: string = '';
  // para enviar informacion del hijo al padre como en este caso para avisar cuando la imagen cargada se cargo de forma exitosa hago uso de output y de EventEmitter. aqui estamos instanciando el output
  @Output() loaded = new EventEmitter<string>();
  imageDefault = 'https://i.picsum.photos/id/940/200/200.jpg?hmac=bIX4juxj93bHJKYbdztQYmQByF-1mM6YI2ec9UrnrTo'


  // TODOS LOS COMENTARIOS DE ESTA SECCION SE REFIEREN A LA EXPLICACION DEL CICLO DE VIDA DE UN COMPONENTE
  // el constructor es lo primero que corre ya que es el que instancia la creacion de cada componente. no correr cosas asincronas en el constructor como el async y await. este component solo se crea una vez y va antes del render
  constructor(){
    console.log(`Constructor, imgValue => ${this.img}`);
  }

  // corre antes y durante el render. su funcion es estar cambiando los inputs. corre las veces que actualicemos los inputs del componente
  ngOnChanges(changes: SimpleChanges): void {
    console.log(`ngOnChanges, imgValue => ${this.img}`);
  }
  // corre antes del render. aqui si se pueden correr cosas asincronas. async, fetch, promesas etc. solo corre una sola vez
  ngOnInit():void{
    console.log(`ngOnInit, imgValue => ${this.img}`);
  }
  // es el que corre despues del render. aca se manejan los hijos (manipularlos o modificarlos) es donde se modificarian
  ngAfterViewInit(): void {
    console.log(`ngAfterViewInit`);
  }

  // se ejecuta cuando se quiere eliminar el componente
  ngOnDestroy(): void {

  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgloaded(){
    console.log('log hijo');
    // con esta linea estamos emitiendo el evento al padre
    this.loaded.emit(this.img);
  };
};
