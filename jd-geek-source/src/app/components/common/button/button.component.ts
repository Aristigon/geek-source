import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent implements OnInit {
  @Input() buttonTextCase: string;
  @Input() buttonClass: string;
  @Input() buttonText: string;
  @Input() buttonLink: string;
  @Input() routerLink = true;

  ngOnInit(): void {
    if (this.buttonTextCase === "lower") {
      this.buttonText = this.buttonText.toLowerCase();
    } else if (this.buttonTextCase === "upper") {
      this.buttonText = this.buttonText.toUpperCase();
    }
  }
}
