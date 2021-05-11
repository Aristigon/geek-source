/* eslint-disable no-magic-numbers */
/* eslint-disable dot-notation */
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import {
  CommonPortalData,
  ProductImage,
} from "src/app/models/commonPortalData.interface";
import { CommonProductsAPIData } from "src/app/models/commonProductsAPIData.interface";
import { BestBuyService } from "src/app/services/best-buy.service";

@Component({
  selector: "app-product-page",
  templateUrl: "./product-page.component.html",
  styleUrls: ["./product-page.component.scss"],
})
export class ProductPageComponent implements OnInit {
  offerTypes = ["digital_insert", "deal_of_the_day"];
  similarProductSkus: number[] = [];
  similarProducts: CommonPortalData[] = [];
  noResultsMessage: string;
  recentlyViewed: CommonPortalData[];
  productData: CommonPortalData;
  @Input() productSKU: number;
  productImages: ProductImage[] = [];
  recentlyViewedInput: number[] = [];

  constructor(
    private bestBuyService: BestBuyService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.productSKU = this.activatedRoute.snapshot.params["product"];
        this.bestBuyService.getSingleProduct(this.productSKU).subscribe(
          (result: CommonPortalData) => {
            if (result !== null) {
              this.productData = result;
            }
          },
          (err) => {
            console.error(err);
            this.noResultsMessage = "No image avaliable yet.";
          }
        );

        const recent = localStorage.getItem("recently").split(",");

        this.recentlyViewedInput = recent.map((x) => Number.parseInt(x));

        if (this.recentlyViewedInput.length > 0) {
          this.bestBuyService
            .getProductsByIds(this.recentlyViewedInput)
            .subscribe(
              (results: CommonProductsAPIData) => {
                if (results.products.length > 0) {
                  this.recentlyViewed = results.products;
                } else {
                  this.noResultsMessage =
                    "No products to display. Please try again later!";
                }
              },
              (err) => {
                console.error(err);
                this.noResultsMessage =
                  "No products to display. Please try again later!";
              }
            );
        } else {
          this.noResultsMessage = "You have not viewed any products lately!";
        }
      }
    });
  }

  ngOnInit(): void {
    this.bestBuyService
      .getSingleProduct(this.productSKU)
      .subscribe((results: CommonPortalData) => {
        if (results !== null) {
          this.similarProductSkus = results.productVariations.map(
            (productVariation) => Number.parseInt(productVariation.sku)
          );

          this.bestBuyService
            .getProductsByIds(this.similarProductSkus)
            .subscribe((products: CommonProductsAPIData) => {
              if (products !== null) {
                this.similarProducts = products.products;
              }
            });
        }
      });
  }
}
