import { Component, Input } from "@angular/core";
import { CommonPortalData } from "src/app/models/commonPortalData.interface";

@Component({
  selector: "app-category-display",
  templateUrl: "./category-display.component.html",
  styleUrls: ["./category-display.component.scss"],
})
export class CategoryDisplayComponent {
  @Input() categoryName: string;
  @Input() productData: CommonPortalData[];
}
