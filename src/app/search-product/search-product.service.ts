import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of, Subject } from 'rxjs';

export interface ProductItem {
  title: string,
  images: string[],
  offerPrice: string,
  originalPrice: string,
  offerRate: number,
  badgeUrl: string,
  location: string,
  numLocations: number,
  review: {
    rating: number,
    count: number,
    absoluteRating: number
  },
  soldRangeCount: {
    id: string
  },
  attributes: {
    optionListingType: string,
    values: string[],
    count: number
  }[]
}

export interface PageInfo {
  ItemsPerPage: number,
  currentPage: number,
  totalPage: number,
  totalItems: number
}

export interface SearchInfo {
  products: ProductItem[],
  paginationInfo: PageInfo,
  searchTerm: string
}

@Injectable({
  providedIn: 'root'
})
export class SearchProductService {

  private currentPage: number = 0;
  private totalItemsInCart: number = 0;
  private searchListSub = new Subject<SearchInfo>();
  private isLoadingSub = new Subject<boolean>();
  private cartItemSub = new Subject<number>();

  constructor(private http: HttpClient) { }

  searchList$() {
    return this.searchListSub.asObservable();
  }

  loading$() {
    return this.isLoadingSub.asObservable();
  }

  cartItems$() {
    return this.cartItemSub.asObservable();
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  addToCart(item: ProductItem): void {
    this.totalItemsInCart++;
    this.cartItemSub.next(this.totalItemsInCart);
  }

  deserializeSearchResponse(responseData: any): ProductItem[] {
    let productItems: ProductItem[] = [];
    responseData?.products?.forEach((product: any) => {
      const item: ProductItem = {
        title: product.name,
        images: product.images,
        offerPrice: product.price?.priceDisplay,
        originalPrice: product.price?.strikeThroughPriceDisplay,
        offerRate: product.price?.discount,
        badgeUrl: product.badge?.merchantBadgeUrl,
        location: product.location,
        numLocations: product.numLocations,
        review: product.review,
        soldRangeCount: product.soldRangeCount,
        attributes: product.attributes
      }
      productItems.push(item)
    })
    return productItems;

  }

  deserializePageIno(responseData: any): PageInfo {
    const pageInfo: PageInfo = {
      ItemsPerPage: responseData?.paging?.item_per_page || 0,
      currentPage: responseData?.paging?.page || 0,
      totalItems: responseData?.paging?.total_item || 0,
      totalPage: responseData?.paging?.total_page || 0,
    }

    return pageInfo;
  
  }

  resetSearchResult(): void {
    const paginationInfo = this.deserializePageIno({});
    const searchInfo: SearchInfo = {
      products: [],
      paginationInfo,
      searchTerm: ""
    }
    this.searchListSub.next(searchInfo);
  }

  searchProducts(searchTerm: string, pageStart?: number): Observable<any> {
    if(!searchTerm) return of({});
    if(pageStart === 0) {
      this.currentPage = pageStart;
      this.resetSearchResult();
    } else {
      this.currentPage++;
    }
    const start = this.currentPage * 24;
     
    const url = `${environment.api_url}/search/products?searchTerm=${searchTerm}&start=${start}&itemPerPage=24`;
    this.isLoadingSub.next(true);
    return this.http.get(url).pipe(
      map((response: any) => {
        const productsList = this.deserializeSearchResponse(response?.data);
        const paginationInfo = this.deserializePageIno(response?.data);
        const searchInfo: SearchInfo = {
          products: productsList,
          paginationInfo,
          searchTerm
        }
        this.searchListSub.next(searchInfo);
        this.isLoadingSub.next(false);
        return productsList
      }),
      catchError((error) => {
        console.log(error);
        this.resetSearchResult();
        this.isLoadingSub.next(false);
        return of({})
      })
    );
  }
}
