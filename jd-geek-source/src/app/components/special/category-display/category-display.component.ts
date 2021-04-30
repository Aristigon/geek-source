/* eslint-disable no-magic-numbers */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonPortalData } from "src/app/models/commonPortalData.interface";

@Component({
  selector: "app-category-display",
  templateUrl: "./category-display.component.html",
  styleUrls: ["./category-display.component.scss"],
})
export class CategoryDisplayComponent {
  @Input() categoryName: string;
  @Input() totalNumberOfProducts: number;
  @Input() productData: CommonPortalData[];
  @Output() addToProductDisplay = new EventEmitter<number>();

  scrollDetect(event): void {
    if (
      event.target.offsetHeight + event.target.scrollTop ===
        event.target.scrollHeight &&
      this.totalNumberOfProducts > 20
    ) {
      this.addToProductDisplay.emit(20);
    }
  }
}
