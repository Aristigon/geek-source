import { Component, Input } from "@angular/core";
import { CommonPortalData } from "src/app/models/commonPortalData.interface";

@Component({
  selector: "app-product-showcase",
  templateUrl: "./product-showcase.component.html",
  styleUrls: ["./product-showcase.component.scss"],
})
export class ProductShowcaseComponent {
  @Input() productData: CommonPortalData;
  @Input() shoppingCart: false;
}
