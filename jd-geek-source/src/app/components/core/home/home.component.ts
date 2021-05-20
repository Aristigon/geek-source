/* eslint-disable no-magic-numbers */
import { Component, OnInit, Input, HostListener } from "@angular/core";
import { CommonPortalData } from "src/app/models/commonPortalData.interface";
import { CommonProductsAPIData } from "src/app/models/commonProductsAPIData.interface";
import { MOBILE_SCREEN_THRESHOLD } from "src/constants/constants";
import { BestBuyService } from "../../../services/best-buy.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  mobileSite = false;
  featuredProducts: CommonPortalData[];
  todaysDeals: CommonPortalData[];
  noResultsMessage: string;
  hottestDeal: CommonPortalData;
  offerTypes = ["digital_insert", "deal_of_the_day"];
  constructor(private bestBuyService: BestBuyService) {}

  ngOnInit(): void {
    const mobile = navigator.userAgent.includes("Mobile");

    if (window.innerWidth <= MOBILE_SCREEN_THRESHOLD || mobile) {
      this.mobileSite = true;
    } else {
      this.mobileSite = false;
    }

    this.bestBuyService.getPortalProducts(this.offerTypes.shift()).subscribe(
      (results: CommonProductsAPIData) => {
        if (results != null) {
          this.featuredProducts = results.products;
        }
      },
      (err) => {
        console.error(err);
        this.noResultsMessage =
          "No products to display. Please try again later!";
      }
    );
    this.bestBuyService.getPortalProducts(this.offerTypes.shift()).subscribe(
      (results: CommonProductsAPIData) => {
        if (results != null) {
          this.todaysDeals = results.products;
          this.hottestDeal = results.products.slice(0, 1).shift();
        }
      },
      (err) => {
        console.error(err);
        this.noResultsMessage =
          "No products to display. Please try again later!";
      }
    );
  }

  @HostListener("window:resize", ["event"])
  onResize(event) {
    if (window.innerWidth <= MOBILE_SCREEN_THRESHOLD) {
      this.mobileSite = true;
    } else {
      this.mobileSite = false;
    }
  }
}
