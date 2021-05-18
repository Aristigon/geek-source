/* eslint-disable no-magic-numbers */
import { Component, Input } from "@angular/core";
import { CommonPortalData } from "src/app/models/commonPortalData.interface";
import { UtilService } from "src/app/services/util.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-showcase",
  templateUrl: "./product-showcase.component.html",
  styleUrls: ["./product-showcase.component.scss"],
})
export class ProductShowcaseComponent {
  @Input() productData: CommonPortalData;
  @Input() shoppingCart: false;
  recentlyViewed: number[] = [];

  constructor(public router: Router, private utilService: UtilService) {}

  addSaveTo(localSave: string, productSku: number): void {
    let saves: string[] = [];

    if (this.utilService.getItems_Local(localSave) !== null) {
      saves = this.utilService.getItems_Local(localSave).split(",");
    }

    if (!saves.includes(productSku.toString())) {
      saves.push(productSku.toString());
    }
    this.utilService.saveItem_Local(localSave, saves.toString());
  }

  linkToProductPage(productSKU: number, event): void {
    const recent = this.utilService.getItems_Local("recently");

    if (event.target.localName !== "button") {
      if (recent !== null) {
        this.recentlyViewed = recent.split(",").map((x) => Number.parseInt(x));
      }

      if (!this.recentlyViewed.includes(productSKU)) {
        if (this.recentlyViewed.length === 10) {
          this.recentlyViewed.pop();
        }
        this.recentlyViewed.push(productSKU);
      }

      this.utilService.saveItem_Local(
        "recently",
        this.recentlyViewed.toString()
      );

      this.router.navigateByUrl(`product/${productSKU}`);
    }
  }
}
