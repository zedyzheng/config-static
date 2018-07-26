import { Directive, ElementRef, AfterViewInit } from "@angular/core";

@Directive({selector: '[table-height-auto]'})
export class TableHeightAutoDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const elDom = this.el.nativeElement;
    let totalHeight = window.document.body.offsetHeight;
    let topBarHeight = 80;
    let searchModuleHeight = elDom.parentNode.previousElementSibling ? (elDom.parentNode.previousElementSibling.childElementCount * 70 + 48 + 10) : 15;
    let operationHeight = ((elDom.previousElementSibling && elDom.previousElementSibling.tagName === 'MAT-CARD-TITLE') ? (38 + 16) : 0);
    let paginatirHeight = ((elDom.nextElementSibling && elDom.nextElementSibling.tagName === 'MAT-PAGINATOR') ? 56 : 0) + 48 + 10;
    let tableHeight = totalHeight - topBarHeight - searchModuleHeight - operationHeight - paginatirHeight;

    elDom.style.height = tableHeight + 'px';
  }
}
