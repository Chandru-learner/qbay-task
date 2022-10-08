import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchHeaderComponent } from './components/search-header/search-header.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { MaterialModule } from 'src/material/material.module';
import { FormsModule } from '@angular/forms';
import { ProductItemComponent } from './components/product-item/product-item.component';



@NgModule({
  declarations: [
    SearchHeaderComponent,
    SearchPageComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ], exports: [
    SearchPageComponent
  ]
})
export class SearchProductModule { }
