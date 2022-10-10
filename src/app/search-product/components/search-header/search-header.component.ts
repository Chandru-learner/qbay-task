import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchProductService } from '../../search-product.service';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent implements OnInit, OnDestroy {

  searchTerm = "";
  totalCartCount = 0;
  cartIemsSub: Subscription | undefined;
  constructor(private searchProductService: SearchProductService) { }

  ngOnInit(): void {
    this.cartIemsSub = this.searchProductService.cartItems$().subscribe((totalCount: number) => {
      this.totalCartCount = totalCount;
    })
  }

  ngOnDestroy(): void {
    this.cartIemsSub?.unsubscribe();
  }

  searchAction(): void {
    this.searchProductService.searchProducts(this.searchTerm, 0).subscribe();
  }

}
