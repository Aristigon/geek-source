/* eslint-disable max-params */
/* eslint-disable no-magic-numbers */
import { Component, OnInit } from "@angular/core";
import { CommonPortalData } from "src/app/models/commonPortalData.interface";
import { CommonProductsAPIData } from "src/app/models/commonProductsAPIData.interface";
import { BestBuyService } from "src/app/services/best-buy.service";
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: "app-shopping-cart-page",
  templateUrl: "./shopping-cart-page.component.html",
  styleUrls: ["./shopping-cart-page.component.scss"],
})
export class ShoppingCartPageComponent implements OnInit {
  shoppingCartItems: CommonPortalData[] = [];
  shoppingCartSkus: number[] = [];
  shoppingCartItemTotal: number;
  sameAsShipping = false;
  totalCartCost = 0;
  constructor(
    private utilService: UtilService,
    private bestBuyService: BestBuyService
  ) {}

  ngOnInit(): void {
    this.totalCartCost = 0;

    if (
      this.utilService.getItems_Local("shoppingCartItems") !== null &&
      this.utilService.getItems_Local("shoppingCartItems").length > 0
    ) {
      this.shoppingCartItemTotal = this.utilService
        .getItems_Local("shoppingCartItems")
        .split(",")
        .filter((x) => x !== "").length;

      this.shoppingCartSkus = this.utilService
        .getItems_Local("shoppingCartItems")
        .split(",")
        .filter((x) => x !== "")
        .map((sku) => Number.parseInt(sku));

      this.bestBuyService
        .getProductsByIds(this.shoppingCartSkus)
        .subscribe((result: CommonProductsAPIData) => {
          this.shoppingCartItems = result.products;
          this.shoppingCartItems.forEach((item) => {
            this.totalCartCost += item.salePrice;
          });
        });
    } else {
      this.shoppingCartItemTotal = 0;
      this.shoppingCartSkus = [];
      this.shoppingCartItems = [];
    }

    this.shoppingCartItems.forEach((item) => {
      this.totalCartCost += item.salePrice;
    });
  }

  removeItem(productSku: number) {
    let cartSkus: number[] = [];

    cartSkus = this.utilService
      .getItems_Local("shoppingCartItems")
      .split(",")
      .map((sku) => Number.parseInt(sku));

    if (cartSkus.includes(productSku)) {
      const newList = cartSkus.filter((keeping) => keeping !== productSku);

      this.utilService.removeItem_Local("shoppingCartItems");

      if (newList.length > 0) {
        this.utilService.saveItem_Local(
          "shoppingCartItems",
          newList.toString()
        );
      }
    }
    this.ngOnInit();
  }

  billingShippingSame(): void {
    this.sameAsShipping = !this.sameAsShipping;
  }
}
