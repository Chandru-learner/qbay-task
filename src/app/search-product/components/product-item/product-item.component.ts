import { Component, OnInit, Input } from '@angular/core';
import { ProductItem, SearchProductService } from '../../search-product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem!: ProductItem;

  constructor(private searchProductService: SearchProductService) { }

  ngOnInit(): void { }

  addToCrt(): void {
    this.searchProductService.addToCart(this.productItem);
    alert(this.productItem.title + " is added to the cart");
  }

}
