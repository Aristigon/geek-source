/* eslint-disable no-undefined */
/* eslint-disable no-magic-numbers */
import {
  AfterContentChecked,
  Component,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { CommonPortalData } from "src/app/models/commonPortalData.interface";
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: "app-product-display",
  templateUrl: "./product-display.component.html",
  styleUrls: ["./product-display.component.scss"],
})
export class ProductDisplayComponent implements AfterContentChecked {
  @Input() productData: CommonPortalData;
  slides: any;
  slideIndex = 1;

  constructor(private utilService: UtilService) {}

  ngAfterContentChecked(): void {
    this.slides = document.getElementsByClassName("slide");

    if (this.slides[0] !== undefined) {
      this.showSlides(this.slideIndex);
    }
  }

  showSlides(slideIndex: number): void {
    //const slides = document.getElementsByClassName("slide");

    if (slideIndex > this.slides.length) {
      this.slideIndex = 1;
    }

    if (slideIndex < 1) {
      this.slideIndex = this.slides.length;
    }

    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].classList.replace("showImage", "hideImage");
    }

    this.slides[this.slideIndex - 1].classList.replace(
      "hideImage",
      "showImage"
    );
  }

  nextSlide(slideChange: number): void {
    this.showSlides((this.slideIndex += slideChange));
  }

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
}
