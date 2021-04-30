/* eslint-disable no-magic-numbers */
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonPortalData } from "src/app/models/commonPortalData.interface";
import { BestBuyService } from "src/app/services/best-buy.service";

@Component({
  selector: "app-category-page",
  templateUrl: "./category-page.component.html",
  styleUrls: ["./category-page.component.scss"],
})
export class CategoryPageComponent implements OnInit {
  categoryID: string;
  categoryName: string;
  productData: CommonPortalData[] = [];
  totalCountOfProducts: number;
  currentProductsDisplaying = 20;
  @ViewChild("app-category-display") catDisplay: ElementRef;

  constructor(
    private bestBuyService: BestBuyService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // eslint-disable-next-line dot-notation
    this.categoryID = this.activatedRoute.snapshot.params["category"];

    this.bestBuyService
      .getCategoryNameById(this.categoryID)
      .subscribe((catName) => {
        if (catName !== null) {
          this.categoryName = catName.categories[0].name;
        }
      });
    this.bestBuyService
      .getProductsByCategory(
        this.categoryID,
        this.currentProductsDisplaying.toString()
      )
      .subscribe((results) => {
        if (results !== null) {
          this.totalCountOfProducts = results.total;
          this.productData = results.products;
        }
      });
  }

  lazyLoadProducts(additionalProducts: number) {
    this.currentProductsDisplaying += additionalProducts;

    if (this.currentProductsDisplaying > this.totalCountOfProducts) {
      this.currentProductsDisplaying = this.totalCountOfProducts;
    }
    this.bestBuyService
      .getProductsByCategory(
        this.categoryID,
        this.currentProductsDisplaying.toString()
      )
      .subscribe((results) => {
        if (results !== null) {
          this.totalCountOfProducts = results.total;
          this.productData = results.products;
        }
      });
  }
}
