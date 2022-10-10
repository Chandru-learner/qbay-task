import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-image-carousel',
  templateUrl: './product-image-carousel.component.html',
  styleUrls: ['./product-image-carousel.component.scss']
})
export class ProductImageCarouselComponent implements OnInit {

  @Input() productImages!: string[];
  activeIndex: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  plusSlides(val: number): void {
    let nextValue = this.activeIndex + val;
    if(nextValue === this.productImages.length) {
      this.activeIndex = 0;
    } else if(nextValue === -1) {
      this.activeIndex = this.productImages.length - 1;
    } else {
      this.activeIndex = nextValue;
    }
  }
}
