/* eslint-disable no-magic-numbers */
/* eslint-disable no-console */
import { Component, OnInit } from "@angular/core";
import { Categories } from "src/app/models/Categories.interface";
import { CommonPortalData } from "src/app/models/commonPortalData.interface";
import { BestBuyService } from "src/app/services/best-buy.service";
import { UtilService } from "src/app/services/util.service";
import * as testing from "../../../../assets/testingProductIds.json";
import { DropDownLink } from "src/app/models/drop-down-link.interface";
import { CommonProductsAPIData } from "src/app/models/commonProductsAPIData.interface";
import * as configs from "../../../../assets/config.json";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  productData: CommonPortalData[];
  recentlyViewedInput: number[] = [];
  savedItemsProducts: number[] = [];
  menuItems: DropDownLink[] = [];
  displayProductsCarousel = false;
  displayCategoryMenu = true;
  noResultsMessage: string;
  productSelectionTypes = {
    recent: "RECENTLY VIEWED",
    saved: "SAVED ITEMS",
  };
  exitingMenuButton = true;

  constructor(
    private bestBuyService: BestBuyService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.bestBuyService.getTopLevelCategories(configs.categories).subscribe(
      (results: Categories) => {
        if (results != null) {
          for (const category of results.categories) {
            this.menuItems.push({ name: category.name, url: "home" });
          }
        } else {
          this.noResultsMessage = "No categories to select! Try again later!";
          this.displayCategoryMenu = false;
        }
      },
      (err) => {
        this.noResultsMessage = "No categories to select! Try again later!";
        this.displayCategoryMenu = false;
        console.error(err);
      }
    );
  }

  exitCaroselMenu(exitingMenu: boolean): void {
    this.exitingMenuButton = exitingMenu;
  }

  exitCarosel(exitingMenu: boolean, exitingCarosel: boolean): void {
    if (exitingMenu && exitingCarosel) {
      this.displayProductsCarousel = false;
    }
  }

  getProductSelection(productSelection: string): void {
    if (productSelection === this.productSelectionTypes.recent) {
      this.productData = [];

      if (
        this.utilService.getItems_Local("recently") !== null &&
        this.utilService.getItems_Local("recently").length > 0
      ) {
        const recent = this.utilService.getItems_Local("recently").split(",");

        this.recentlyViewedInput = recent.map((x) => Number.parseInt(x));
      }

      if (this.recentlyViewedInput.length > 0) {
        this.bestBuyService
          .getProductsByIds(this.recentlyViewedInput)
          .subscribe(
            (results: CommonProductsAPIData) => {
              if (results.products.length > 0) {
                this.productData = results.products;
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
      this.displayProductsCarousel = true;
    } else if (productSelection === this.productSelectionTypes.saved) {
      this.productData = [];

      const recent = this.utilService.getItems_Local("saveItem").split(",");

      this.savedItemsProducts = recent.map((x) => Number.parseInt(x));

      if (this.savedItemsProducts.length > 0) {
        this.bestBuyService.getProductsByIds(this.savedItemsProducts).subscribe(
          (results: CommonProductsAPIData) => {
            if (results.products.length > 0) {
              this.productData = results.products;
            } else {
              this.noResultsMessage =
                "No products to display. Please try again later! Jack!!";
            }
          },
          (err) => {
            console.error(err);
            this.noResultsMessage =
              "No products to display. Please try again later!";
          }
        );
      } else {
        this.noResultsMessage = "You do not have any saved products!";
      }
      this.displayProductsCarousel = true;
    } else {
      this.displayProductsCarousel = false;
    }
  }
}
