import { Directive, ElementRef, HostListener } from '@angular/core';

// las directivas me sirven para manipular directamente los elementos HTML y modificarlos en este ejemplo estoy tomando el elemento nativo y le estoy modificando el color de fondo a rojo. esto ya no hace parte propiamente de angular sino nativamente de javascript se pueden usar instrucciones de js etc.
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @HostListener('mouseenter') OnMouseEnter() {
    this.element.nativeElement.style.backgroundColor = 'red';
  }

  @HostListener('mouseleave') OnMouseLeave() {
    this.element.nativeElement.style.backgroundColor = '';
  }
  constructor(
    private element: ElementRef
  ) {
    // this.element.nativeElement.style.backgroundColor = 'red';
  }

}
