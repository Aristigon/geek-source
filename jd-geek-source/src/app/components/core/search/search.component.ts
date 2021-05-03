import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  @Input() componentPlacement: string;
  searchArea: string;
  searchBox: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.searchBox = `searchBox--${this.componentPlacement}`;
    this.searchArea = `searchBoxArea--${this.componentPlacement}`;
  }

  searchProducts(searchText: string): void {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigateByUrl(`/category/true/${searchText}`));
  }
}
