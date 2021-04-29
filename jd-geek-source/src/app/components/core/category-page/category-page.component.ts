/* eslint-disable no-magic-numbers */
import { Component, OnInit } from "@angular/core";
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
      .getProductsByCategory(this.categoryID)
      .subscribe((results) => {
        if (results !== null) {
          this.productData = results.products;
        }
      });
  }
}
