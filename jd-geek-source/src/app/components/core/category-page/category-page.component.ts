/* eslint-disable dot-notation */
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
  searchProducts: string;
  textSearch = false;
  @ViewChild("app-category-display") catDisplay: ElementRef;

  constructor(
    private bestBuyService: BestBuyService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.textSearch = this.booleanConversion(
      this.activatedRoute.snapshot.params["textSearch"]
    );

    if (this.textSearch) {
      this.searchProducts = `search=${this.activatedRoute.snapshot.params["searchProducts"]}`;

      this.categoryName = `Search Text: ${this.activatedRoute.snapshot.params["searchProducts"]}`;
    } else {
      this.searchProducts = `categoryPath.id=${this.activatedRoute.snapshot.params["searchProducts"]}`;
      this.categoryID = this.activatedRoute.snapshot.params["searchProducts"];

      this.bestBuyService.getCategoryNameById(this.categoryID).subscribe(
        (catName) => {
          if (catName !== null) {
            this.categoryName = catName.categories[0].name;
          }
        },
        (err) => {
          console.error(err);
        }
      );
    }

    this.bestBuyService
      .getProducts(
        this.searchProducts,
        this.currentProductsDisplaying.toString()
      )
      .subscribe((results) => {
        if (results !== null) {
          this.totalCountOfProducts = results.total;
          this.productData = results.products;
        }
      });
  }

  booleanConversion(value: string): boolean {
    if (value === "true") {
      return true;
    }

    return false;
  }

  lazyLoadProducts(additionalProducts: number) {
    this.currentProductsDisplaying += additionalProducts;

    if (this.currentProductsDisplaying > this.totalCountOfProducts) {
      this.currentProductsDisplaying = this.totalCountOfProducts;
    }

    this.bestBuyService
      .getProducts(
        this.searchProducts,
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
