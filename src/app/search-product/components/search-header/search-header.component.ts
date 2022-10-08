import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent implements OnInit {

  value = "samsung";
  constructor() { }

  ngOnInit(): void {
  }

}
