import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {


  productItem = {
    title: "Samsung Galaxy Watch4 Smartwatch [44 mm]",
    images: [ "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//105/MTA-24549567/samsung_samsung_galaxy_watch4_smartwatch_-44_mm-_full09_bfwp2d8w.jpg"],
    offerPrice: "Rp2.799.000",
    originalPrice: "Rp3.499.000",
    offerRate: "20",
    badgeUrl: "https://www.static-src.com//siva/asset///07_2020/icon-top-rated-diamond.png",
    location: "Kota Tangerang",
    numLocations: 2,
    review: {
      rating: 4,
      count: 238,
      absoluteRating: 4.9
    },
    soldRangeCount: {
      en: "795",
      id: "795"
    },
    attributes: {
      optionListingType: "COLOR_PALETE",
      values: [
        "MULTICOLOR"
      ],
      count: 2
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
