/* eslint-disable no-magic-numbers */
import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonPortalData } from "src/app/models/commonPortalData.interface";
import { UtilService } from "src/app/services/util.service";

const RIGHT_SCROLL_STOP = 0;

@Component({
  selector: "app-product-display-portal",
  templateUrl: "./product-display-portal.component.html",
  styleUrls: ["./product-display-portal.component.scss"],
})
export class ProductDisplayPortalComponent implements OnChanges, OnInit {
  @Input() productData: CommonPortalData[];
  @Input() carouselID: string;
  @Input() errorMessage: string;
  carouselElementID: string;
  leftScrollDisabled: boolean;
  rightScrollDisabled = true;
  maxScroll: number;
  scrollTracker = RIGHT_SCROLL_STOP;
  displayProducts = true;
  recentlyViewed: number[] = [];
  mobileSite = false;

  constructor(public router: Router, private utilService: UtilService) {}

  ngOnInit(): void {
    if (navigator.userAgent.includes("Mobile")) {
      this.mobileSite = true;
    } else {
      this.mobileSite = false;
    }
  }

  ngOnChanges(): void {
    if (this.productData) {
      this.displayProducts = this.productData.length > 0;
    }
  }
  leftScroll(scrollAmount: number, elementId: string): void {
    const carouselElement = document.getElementById(elementId);
    const maxScroll = carouselElement.scrollWidth - carouselElement.clientWidth;

    if (this.scrollTracker < maxScroll) {
      this.scrollTracker += scrollAmount;
      carouselElement.scrollLeft += scrollAmount;
    }

    if (this.scrollTracker >= maxScroll) {
      this.rightScrollDisabled = false;
      this.leftScrollDisabled = true;
    } else {
      this.rightScrollDisabled = false;
    }
  }

  rightScroll(direction: number, elementId: string): void {
    if (this.scrollTracker > RIGHT_SCROLL_STOP) {
      this.scrollTracker -= direction;
      document.getElementById(elementId).scrollLeft -= direction;
    }

    if (this.scrollTracker <= RIGHT_SCROLL_STOP) {
      this.rightScrollDisabled = true;
      this.leftScrollDisabled = false;
    }
  }

  linkToProductPage(productSKU: number): void {
    const recent = this.utilService.getItems_Local("recently");

    if (recent !== null) {
      this.recentlyViewed = recent.split(",").map((x) => Number.parseInt(x));
    }

    if (!this.recentlyViewed.includes(productSKU)) {
      if (this.recentlyViewed.length === 10) {
        this.recentlyViewed.pop();
      }
      this.recentlyViewed.push(productSKU);
    }

    this.utilService.saveItem_Local("recently", this.recentlyViewed.toString());

    this.router.navigateByUrl(`product/${productSKU}`);
  }
}
