/* eslint-disable no-magic-numbers */
import { Component, DoCheck, Input } from "@angular/core";
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"],
})
export class ShoppingCartComponent implements DoCheck {
  itemCount: number;
  message = "items in your cart";
  @Input() iconPlacement: string;
  @Input() iconSize: string;

  constructor(private utilService: UtilService) {}
  ngDoCheck(): void {
    if (
      this.utilService.getItems_Local("shoppingCartItems") !== null &&
      this.utilService.getItems_Local("shoppingCartItems").length > 0
    ) {
      this.itemCount = this.utilService
        .getItems_Local("shoppingCartItems")
        .split(",")
        .filter((x) => x !== "").length;
    } else {
      this.itemCount = 0;
    }
  }
}
