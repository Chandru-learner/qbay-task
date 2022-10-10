import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageInfo, ProductItem, SearchProductService } from '../../search-product.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy {

  productList: ProductItem[] = [];
  loading: boolean = false;
  private searchListSubs: Subscription | undefined;
  private isLoadingSubs: Subscription | undefined;
  private pageInfo!: PageInfo;
  private searchTerm!: string;
  constructor(private searchProductService: SearchProductService) { }


  ngOnInit(): void {
    this.searchListSubs = this.searchProductService.searchList$().subscribe((searchInfo) => {
      this.searchTerm = searchInfo.searchTerm;
      this.pageInfo = searchInfo.paginationInfo;
      const currentPage = this.searchProductService.getCurrentPage();
      if(currentPage === 0) {
        this.productList = searchInfo.products;
      } else {
        this.productList.push(...searchInfo.products);
      }
    });

    this.isLoadingSubs = this.searchProductService.loading$().subscribe((isLoading) => this.loading = isLoading);
  }

  ngOnDestroy(): void {
    this.searchListSubs?.unsubscribe();
    this.isLoadingSubs?.unsubscribe();
  }

  onScroll(event: any): void {
    let scrollElem = event.target;

    let limit = scrollElem.scrollHeight - scrollElem.clientHeight;
    if (scrollElem.scrollTop === limit) {
      // alert('end reached');
      this.paginateItems();
    }
  }

  paginateItems(): void {
    if(!this.pageInfo || !this.searchTerm || this.loading) return;

    const nextPage = this.searchProductService.getCurrentPage() + 1;
    const start = nextPage * this.pageInfo.ItemsPerPage;

    if(start > this.pageInfo.totalItems) {
      console.log("pagination ends!");
      return;
    }

    this.searchProductService.searchProducts(this.searchTerm).subscribe((response) => {
    });
  }
}
